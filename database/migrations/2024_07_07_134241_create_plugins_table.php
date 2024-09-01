<?php

use App\Models\Author;
use App\Models\Category;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('plugins', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('full_name');
            $table->foreignIdFor(Author::class);
            $table->string('description', length: 1000)->nullable();
            $table->integer('stargazers_count');
            $table->string('html_url');
            $table->string('url');
            $table->boolean('archived');
            // $table->foreignIdFor(Category::class);
            $table->timestamp('created_at');
            $table->timestamp('updated_at');
            $table->timestamp('uploaded_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plugins');
    }
};
