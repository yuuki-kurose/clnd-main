<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('identity_providers', function (Blueprint $table) {
            $table->id('user_id')->comment('ユーザーID');
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
            $table->string('provider_name')->comment('プロバイダー名');
            $table->string('provider_user_id')->comment('プロバイダーユーザーID');
            $table->primary(['provider_name', 'provider_user_id']);
            $table->unique(['user_id', 'provider_name']);
            $table->dateTime('created_at')->nullable()->comment('作成日時');
            $table->dateTime('updated_at')->nullable()->comment('更新日時');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('identity_providers');
    }
};
