<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MyCourse extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function Course()
    {
        return $this->belongsTo(Course::class);
    }

    public function User()
    {
        return $this->belongsTo(User::class);
    }
}
