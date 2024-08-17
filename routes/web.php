<?php

use App\Http\Controllers\ProfileController;
use App\Models\Author;
use App\Models\Plugin;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

Route::get('/', function () {
    $tags = Tag::orderBy('hits', 'desc')->get();
    $plugins = Plugin::query()->with(['author', 'tags:id,name'])->orderBy('stargazers_count', 'desc')->get();

    return Inertia::render('Home', [
        'tags' => $tags,
        'plugins' => $plugins,
    ]);
    // return Inertia::render('Welcome', [
    //     'canLogin' => Route::has('login'),
    //     'canRegister' => Route::has('register'),
    //     'laravelVersion' => Application::VERSION,
    //     'phpVersion' => PHP_VERSION,
    // ]);
});

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

Route::get('/plugin/add', function () {
    $tags = Tag::query()->orderBy('name')->get();
    return Inertia::render('PluginCreate', ['tags' => $tags]);
})->name('plugin.create');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/test', function () {
    $response = Http::withToken(env('GITHUB_TOKEN'))->get('https://api.github.com/repos/stevearc/conform.nvim')->collect();
    // $response = Http::withToken(env('GITHUB_TOKEN'))->get('https://api.github.com/users/michaelshawuk');
    $filtered = collect($response['owner'])->only(['id', 'login', 'html_url', 'avatar_url']);
    dd(Schema::getColumnListing((new Author())->getTable()));
    dd($filtered);
});

Route::get('/hello', function () {
    return Inertia::render('Hello');
});

Route::post('/search', function (Request $request) {
    $query = $request->input('q');
    $plugins = Plugin::query()->with('author', 'tags')->where('name', 'LIKE', "%$query%")->get();
    return Inertia::render('TagQuery', ['tag' => 'Search Results', 'plugins' => $plugins]);
});

Route::get('/auth/redirect', function () {
    return Socialite::driver('github')->redirect();
});

Route::get('/auth/callback', function () {
    $githubUser = Socialite::driver('github')->user();

    $user = User::query()->updateOrCreate([
            'github_id' => $githubUser->getId(),
        ],
        [
            'name' => $githubUser->getName(),
            'nickname' => $githubUser->getNickname(),
            'avatar_url' => $githubUser->getAvatar(),
            'email' => $githubUser->getEmail(),
            'github_token' => $githubUser->token,
            'github_refresh_token' => $githubUser->refreshToken,
        ]);

    Auth::login($user, true);

    return redirect('dashboard');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
