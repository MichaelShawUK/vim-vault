<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Str;

class Plugin extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $guarded = [];

    protected function description(): Attribute
    {
        return Attribute::make(
            get: fn (?string $value) => $value ?? 'Description not available'
        );
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(Author::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class);
    }

    public function slug()
    {
        return Str::of($this->full_name)->replace('/', ' ')->replace('.', ' ')->slug();
    }
}
