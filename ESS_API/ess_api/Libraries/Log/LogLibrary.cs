using Libraries.Log.Abstraction;
using Serilog;
using System;

namespace Libraries.Log
{
    public class LogLibrary<T> : ILogLibrary<T>
    {
        private static NLog.Logger _logger = NLog.LogManager.GetCurrentClassLogger();

        public void Exception(Exception e)
        {
            _logger.Error(e, e.Message);
        }

        [Obsolete]
        public void Exception(Exception e, string message)
        {
            _logger.ErrorException(message, e);
        }

        public void Error(string message, params object[] args)
        {
            _logger.Error(message, args);
        }

        public void Info(string message, params object[] args)
        {
            _logger.Info(message, args);
        }

        public void Warning(string message, params object[] args)
        {
            _logger.Warn(message, args);
        }
    }
}
