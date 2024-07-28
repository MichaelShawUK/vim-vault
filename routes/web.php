<?php

use App\Http\Controllers\ProfileController;
use App\Models\Author;
use App\Models\Plugin;
use App\Models\Tag;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;

Route::get('/', function () {
    $tags = Tag::orderBy('hits', 'desc')->get();
    $plugins = Plugin::query()->with(['author', 'tags:id,name'])->get();

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

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
