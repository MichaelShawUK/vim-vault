<?php

use App\Http\Controllers\PluginController;
use App\Http\Controllers\ProfileController;
use App\Models\Author;
use App\Models\Plugin;
use App\Models\Tag;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

// Route::get('/', function () {
//     $tags = Tag::orderBy('hits', 'desc')->get();
//     $plugins = Plugin::query()->with(['author', 'tags:id,name'])->orderBy('stargazers_count', 'desc')->get();
//     $saved = [];
//     if (Auth::user())
//     {
//         $user = User::find(Auth::user()->id);
//         $saved = $user->savedPlugins->pluck('id')->toArray();
//     }


//     return Inertia::render('Home', [
//         'tags' => $tags,
//         'plugins' => $plugins,
//         'saved' => $saved
//     ]);
// return Inertia::render('Welcome', [
//     'canLogin' => Route::has('login'),
//     'canRegister' => Route::has('register'),
//     'laravelVersion' => Application::VERSION,
//     'phpVersion' => PHP_VERSION,
// ]);
// });

//TODO: web file todo
//
//FIX: rectify this
//
//WARNING: see this?

Route::get('/tags/{tag}', function ($tag) {
    $record = Tag::query()->with(['plugins', 'plugins.author', 'plugins.tags'])->where('name', $tag)->first();
    $record->increment('hits');
    $plugins = $record->plugins;
    return Inertia::render('TagQuery', ['tag' => $tag, 'plugins' => $plugins]);
});

Route::get('/author/{author}', function ($author) {
    $owner = Author::query()->with(['plugins', 'plugins.tags'])->where('login', $author)->first();
    return Inertia::render('Author', ['owner' => $owner]);
});

Route::get('/', function () {
    $plugins = Plugin::orderBy('stargazers_count', 'desc')->get();
    $tags = Tag::orderBy('hits', 'desc')->limit(12)->get();
    return Inertia::render('Plugin/Index', ['plugins' => $plugins, 'tags' => $tags]);
});

Route::get('/plugin/sort={category}', function ($category) {
    $plugins = Plugin::orderBy($category)->get();
    return Inertia::render('Plugin/Index', ['plugins' => $plugins, 'tags' => []]);
});

Route::get('/plugin/add', [PluginController::class, 'create'])->name('plugin.add');
Route::post('/plugin/confirm', [PluginController::class, 'store']);
Route::post('/plugin/destroy/{id}', [PluginController::class, 'destroy']);
Route::post('/plugin/reset/{id}', [PluginController::class, 'reset']);
Route::post('/plugin/add-tags', [PluginController::class, 'addTags']);
Route::post('/plugin/save', function (Request $request) {
    $userId = $request->input('userId');
    $pluginId = $request->input('pluginId');
    $found = DB::table('saved_plugins_users')->where('plugin_id', $pluginId)->where('user_id', $userId)->first();
    if ($found) {
        DB::table('saved_plugins_users')->delete($found->id);
    } else {
        $user = User::find($userId);
        $user->savedPlugins()->attach($pluginId);
    }
    return back();
});
Route::get('/plugin/saved', function () {
    $plugins = Auth::user() ? Auth::user()->savedPlugins : [];
    return Inertia::render('Plugin/Saved', ['plugins' => $plugins]);
});

Route::get('/plugin/tag/{tag}', function (string $tag) {
    $record = Tag::query()->where('name', $tag)->first();
    // TODO: Redirect user if no matching tag is found in database
    if (!$record) dd("Failed to locate tag");
    $record->increment('hits');
    return Inertia::render('Plugin/Tagged', ['plugins' => $record->plugins]);
});

Route::get('/plugin/owner/{owner}', function (string $owner) {
    $author = Author::query()->where('login', $owner)->first();
    // TODO: Redirect if no matching owner is found in database
    if (!$author) dd('Failed to locate owner');
    return Inertia::render('Plugin/Owner', ['plugins' => $author->plugins]);
});

Route::get('/plugin/search', function (Request $request) {
    $query = $request->input('q');
    $plugins = Plugin::query()->where('name', 'LIKE', "%$query%")->get();
    $tagMatch = Tag::query()->where('name', 'LIKE', "%$query%")->get();
    foreach ($tagMatch as $tag) {
        $plugins->push($tag->plugins);
    };
    $desc = Plugin::query()->where('description', 'LIKE', "%$query%")->get();
    $plugins->push($desc);
    $owner = Author::query()->where('login', 'LIKE', "%$query%")->get();
    foreach ($owner as $author) {
        $plugins->push($author->plugins);
    }
    // dd($owner);
    // dd($plugins->flatten()->unique('id')->values()->all());

    return Inertia::render('Plugin/Search', ['plugins' => $plugins->flatten()->unique('id')->values()->all()]);
});

Route::post('/plugin/search', function (Request $request) {
    dd($request);
});

//NOTE: Dashboard is not used
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

//TEST:
Route::get('/test', function () {
    $plugin = Plugin::query()->where('name', 'vim-surround')->first();
    if ($plugin) $plugin->delete();
    return Inertia::render('PluginCreate');
});

// TEST:
Route::get('/comment', function () {
    return Inertia::render('Plugin/Show');
});

//HACK: Hello page not needed
Route::get('/hello', function () {
    return Inertia::render('Hello');
});

Route::get('/search', function (Request $request) {
    $query = $request->input('q');
    $plugins = Plugin::query()->with('author', 'tags')->where('name', 'LIKE', "%$query%")->get();
    return Inertia::render('TagQuery', ['tag' => $query, 'plugins' => $plugins]);
});

Route::get('/auth/redirect', function () {
    return Socialite::driver('github')->redirect();
});

Route::get('/auth/callback', function () {
    $githubUser = Socialite::driver('github')->user();

    $user = User::query()->updateOrCreate(
        [
            'github_id' => $githubUser->getId(),
        ],
        [
            'name' => $githubUser->getName(),
            'nickname' => $githubUser->getNickname(),
            'avatar_url' => $githubUser->getAvatar(),
            'email' => $githubUser->getEmail(),
            'github_token' => $githubUser->token,
            'github_refresh_token' => $githubUser->refreshToken,
        ]
    );

    Auth::login($user, true);

    return redirect('dashboard');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
