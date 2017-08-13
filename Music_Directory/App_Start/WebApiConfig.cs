using Music_Directory.App_Start;
using System.Web.Http;

namespace Music_Directory
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            config.EnsureInitialized();

            config.Formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Serialize;
            config.Formatters.JsonFormatter.SerializerSettings.PreserveReferencesHandling = Newtonsoft.Json.PreserveReferencesHandling.None;


            // Web API routes
            //config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                    name: "DefaultApi",
                    routeTemplate: "api/{controller}/{action}/{id}",
                    defaults: new { id = RouteParameter.Optional, action = RouteParameter.Optional },
                    constraints: null
                    );

            config.DependencyResolver = new DependenciesRegistry.UnityResolver(DependenciesRegistry.RegisterComponents());

        }
    }
}
