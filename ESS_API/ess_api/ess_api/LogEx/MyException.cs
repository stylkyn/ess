using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ess_api.LogEx
{
    public class MyException : Exception
    {
        // Exception message caught in catch
        public MyException(string msg) : base(msg)
        {
            clsLogError.WriteModuleLog("ERROR", msg);
        }
        // My Custom HttpException message caught everywhere
        public MyException(Exception e) : base (e.Message)
        {
            clsLogError.WriteModuleLog("ERROR", e);
        }
    }
}