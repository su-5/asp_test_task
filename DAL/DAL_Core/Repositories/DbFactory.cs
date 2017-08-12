using DAL.DAL_Core.Interfaces;
using DAL.ModelBD;
using System;

namespace DAL.DAL_Core.Repositories
{
    public class DbFactory : Disposable, IDbFactory
    {
        MusicDBEntities _dbContext;
        public MusicDBEntities Init()
        {
            return _dbContext ?? (_dbContext = new MusicDBEntities());
        }

        protected override void DisposeCore()
        {
            _dbContext?.Dispose();
        }
    }

    public class Disposable : IDisposable
    {
        private bool _isDisposed;

        ~Disposable()
        {
            Dispose(false);
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        private void Dispose(bool disposing)
        {
            if (!_isDisposed && disposing)
            {
                DisposeCore();
            }

            _isDisposed = true;
        }

        // Ovveride this to dispose custom objects
        protected virtual void DisposeCore()
        {
        }
    }
}
