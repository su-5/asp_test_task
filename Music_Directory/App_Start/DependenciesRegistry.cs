using BLL.BLL_Core.Interfaces;
using BLL.BLL_Core.Repositories;
using Microsoft.Practices.Unity;
using System;
using System.Collections.Generic;
using System.Web.Http.Dependencies;

namespace Music_Directory.App_Start
{
    public class DependenciesRegistry
    {

        public static IUnityContainer RegisterComponents()
        {
            IUnityContainer container = new UnityContainer();
            container.RegisterType<IBllFactory, BllFactory>(); // singleton

            return container;
        }

        public class UnityResolver : IDependencyResolver
        {
            protected IUnityContainer Container;

            public UnityResolver(IUnityContainer container)
            {
                if (container == null)
                {
                    throw new ArgumentNullException(nameof(container));
                }
                Container = container;
            }

            public object GetService(Type serviceType)
            {
                try
                {
                    return Container.Resolve(serviceType);
                }
                catch (ResolutionFailedException)
                {
                    return null;
                }
            }

            public IEnumerable<object> GetServices(Type serviceType)
            {
                try
                {
                    return Container.ResolveAll(serviceType);
                }
                catch (ResolutionFailedException)
                {
                    return new List<object>();
                }
            }

            public IDependencyScope BeginScope()
            {
                var child = Container.CreateChildContainer();
                return new UnityResolver(child);
            }

            public void Dispose()
            {
                Container.Dispose();
            }
        }
    }
}