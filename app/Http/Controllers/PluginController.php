<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Plugin;
use App\Models\Tag;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class PluginController extends Controller
{
    private function formatTimestamps(array $data)
    {
        $data['created_at'] = Carbon::parse($data['created_at'])->toDateTimeString();
        $data['updated_at'] = Carbon::parse($data['updated_at'])->toDateTimeString();
        return $data;
    }

    public function create()
    {
        return Inertia::render('PluginCreate');
    }

    public function store(Request $request)
    {
        $url = $request->input('url');
        if (Plugin::query()->where('url', $url)->exists()) {
            return back()->withErrors(['url' => 'Plugin already exists']);
        }

        $response = Http::withToken(env('GITHUB_TOKEN'))->get($url);
        if ($response->failed()) {
            return back()->withErrors(['url' => 'Failed to locate repo. Please check URL']);
        }

        $requiredFields = ['id', 'name', 'full_name', 'description', 'stargazers_count', 'html_url', 'url', 'archived', 'created_at', 'updated_at'];
        $pluginData = $response->collect()->only($requiredFields)->toArray();
        $pluginData = $this->formatTimestamps($pluginData);
        $plugin = new Plugin($pluginData);

        $owner = collect($response['owner'])->only(['id', 'login', 'avatar_url', 'html_url']);
        $author = Author::query()->firstOrCreate($owner->only('id')->toArray(), $owner->except('id')->toArray());
        $plugin->author()->associate($author);
        $plugin->uploaded_at = Carbon::now();
        $plugin->save();

        $tags = Tag::query()->orderBy('name')->get();

        return Inertia::render('PluginConfirm', ['plugin' => $plugin, 'tags' => $tags]);
    }

    public function destroy(string $id)
    {
        Plugin::destroy($id);
    }

    public function reset(string $id)
    {
        Plugin::destroy($id);
        return to_route('plugin.add');
    }

    public function addTags(Request $request)
    {
        $plugin = Plugin::find($request->input('id'));
        $tags = $request->input('tags');

        foreach($tags as $tagName) {
            $tag = Tag::query()->firstOrCreate(['name' => $tagName]);
            $plugin->tags()->attach($tag->id);
    }

    return redirect('/');
    }
}
