<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $guarded = ["id"];

    public function Mentor()
    {
        return $this->belongsTo(Mentor::class);
    }

    public function Chapters()
    {
        return $this->hasMany(Chapter::class);
    }

    public function MyCourses()
    {
        return $this->hasMany(MyCourse::class);
    }

    public function CourseImages()
    {
        return $this->hasMany(CourseImage::class);
    }

    public function Reviews()
    {
        return $this->hasMany(Review::class);
    }
}
