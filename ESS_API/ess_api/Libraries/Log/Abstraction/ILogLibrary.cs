using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Libraries.Log.Abstraction
{
    public interface ILogLibrary<T>
    {
        void Exception(Exception e);
        void Exception(Exception e, string message);
        void Error(string message, params object[] args);
        void Warning(string message, params object[] args);
        void Info(string message, params object[] args);
    }
}
