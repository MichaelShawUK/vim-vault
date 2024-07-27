<?php

use App\Models\Plugin;
use Carbon\Carbon;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Http;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();

Artisan::command('update:plugins', function () {
    Plugin::all()->each(function (Plugin $plugin) {
        $fields = ['name', 'description', 'stargazers_count', 'updated_at', 'archived'];

        $this->info("Checking $plugin->name...");
        $response = Http::withToken(env('GITHUB_TOKEN'))->get($plugin->url)->collect()->only($fields);

        $response->transform(function ($value, $key) {
            if ($key == 'updated_at') {
                return Carbon::parse($value)->toDateTimeString();
            } else {
                return $value;
            }
        });

        foreach($fields as $field) {
            if ($plugin->$field != $response->get($field)) {
                $this->warn("$field has changed");
                $plugin->$field = $response->get($field);
                $plugin->save();
            }
        }
    });
})->purpose('Send API request and update plugins table');
