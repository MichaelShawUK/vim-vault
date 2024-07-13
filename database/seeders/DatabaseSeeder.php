<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Plugin;
use App\Models\User;
use App\Models\Author;
use App\Models\Tag;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $plugin = new Plugin([
            'name' => 'conform',
            'description' => 'Lightweight yet powerful formatter plugin for Neovim',
            'stars' => 2547,
            'url' => 'https://github.com/stevearc/conform.nvim',
        ]);

        $author = Author::create(['name' => 'stevearc']);
        $category = Category::create(['name' => 'formatter']);

        $plugin->author()->associate($author);
        $plugin->category()->associate($category);
        $plugin->save();

        $tag1 = Tag::create(['name' => 'indent']);
        $tag2 = Tag::create(['name' => 'format']);

        $plugin->tags()->attach([$tag1->id, $tag2->id]);

        Tag::query()->create(['name' => 'lsp']);
        Tag::query()->create(['name' => 'colorscheme']);
        Tag::query()->create(['name' => 'git']);
        Tag::query()->create(['name' => 'keymap']);
        Tag::query()->create(['name' => 'surround']);
        Tag::query()->create(['name' => 'treesitter']);
        Tag::query()->create(['name' => 'snippet']);


    }
}
