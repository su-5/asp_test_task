﻿//------------------------------------------------------------------------------
// <auto-generated>
//     Этот код создан по шаблону.
//
//     Изменения, вносимые в этот файл вручную, могут привести к непредвиденной работе приложения.
//     Изменения, вносимые в этот файл вручную, будут перезаписаны при повторном создании кода.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DAL.ModelBD
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;

    public partial class MusicDBEntities : DbContext
    {
        public MusicDBEntities()
            : base("name=MusicDBEntities")
        {
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Track>().HasMany(e => e.Albums)
                .WithMany(e => e.Tracks)
                .Map(m => m.ToTable("AlbumTrack").MapLeftKey("TrackId").MapRightKey("AlbumId"));
        }

        public virtual DbSet<Album> Albums { get; set; }
        public virtual DbSet<Track> Tracks { get; set; }
    }
}
