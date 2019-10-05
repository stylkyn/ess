using System;
using System.Diagnostics;
using System.IO;
using System.Net;
using System.Reflection;
using System.Text;

namespace ess_api
{
    public class clsException
    {

        private static string GetMachineName()
        {
            try
            {
                return Environment.MachineName;
            }
            catch (Exception ex)
            {
                return string.Format("Could not get machine name: {0} ---", ex);
            }
        }


        private static string GetCurrentIP()
        {
            try
            {
                string hostName = Dns.GetHostName();
                IPHostEntry hostEntry = Dns.GetHostEntry(hostName);

                string ipList = string.Empty;

                for (int i = 0; i < hostEntry.AddressList.Length; i++)
                {
                    if (i != 0) ipList += ", ";

                    IPAddress ip = hostEntry.AddressList[i];
                    ipList += string.Format("{0}", ip);
                }

                return ipList;
            }
            catch
            {
                return "127.0.0.1";
            }
        }


        //
        // ---
        //

        private static string CurrentWindowsIdentity()
        {
            try
            {
                return System.Security.Principal.WindowsIdentity.GetCurrent().Name;
            }
            catch
            {
                return string.Empty;
            }
        }


        private static string CurrentEnvironmentIdentity()
        {
            try
            {
                return Environment.UserDomainName + "\\" + Environment.UserName;
            }
            catch
            {
                return string.Empty;
            }
        }


        private static string GetUserIdentity()
        {
            string strTemp = CurrentWindowsIdentity();
            if (string.IsNullOrEmpty(strTemp))
                strTemp = CurrentEnvironmentIdentity();

            return strTemp;
        }


        //
        // ---
        //

        private static string GetAppDomain()
        {
            try
            {
                return AppDomain.CurrentDomain.FriendlyName;
            }
            catch (Exception ex)
            {
                return string.Format("Could not get app domain name: {0} ---", ex);
            }
        }


        private static Assembly GetParentAssembly()
        {
            Assembly parentAssembly = null;

            if (Assembly.GetEntryAssembly() == null)
            {
                parentAssembly = Assembly.GetCallingAssembly();
            }
            else
            {
                parentAssembly = Assembly.GetEntryAssembly();
            }

            return parentAssembly;
        }


        private static DateTime? GetAssemblyFileTime(Assembly a)
        {
            try
            {
                return File.GetLastWriteTime(a.Location);
            }
            catch
            {
                return null;
            }
        }


        /// <summary>
        /// Returns build datetime of assembly. Assumes default assembly value in AssemblyInfo. Filesystem create time is used, if revision and build were overridden by user.
        /// </summary>
        /// <param name="a"></param>
        /// <param name="forceFileDate"></param>
        /// <returns></returns>
        private static DateTime? GetAssemblyBuildDate(Assembly a, bool forceFileDate)
        {
            Version version = a.GetName().Version;
            DateTime buildDate = default(DateTime);

            if (forceFileDate)
            {
                return GetAssemblyFileTime(a);
            }
            else
            {
                buildDate = new DateTime(2000, 1, 1).AddDays(version.Build).AddSeconds(version.Revision * 2);

                if (TimeZone.IsDaylightSavingTime(DateTime.Now, TimeZone.CurrentTimeZone.GetDaylightChanges(DateTime.Now.Year)))
                {
                    buildDate = buildDate.AddHours(1);
                }

                if (buildDate > DateTime.Now | version.Build < 730 | version.Revision == 0)
                {
                    return GetAssemblyFileTime(a);
                }
            }

            return buildDate;
        }


        public static string AssemblyInfoString(Assembly a)
        {
            object helper;
            if (a == null) a = GetParentAssembly();

            StringBuilder sb = new StringBuilder();

            try { helper = a.CodeBase; }
            catch (Exception e) { helper = e; }
            sb.Append(string.Format("Assembly Codebase: {0}", helper));
            sb.Append(Environment.NewLine);

            try { helper = a.FullName; }
            catch (Exception e) { helper = e; }
            sb.Append(string.Format("Assembly Full Name: {0}", helper));
            sb.Append(Environment.NewLine);

            try { helper = a.GetName().Version.ToString(); }
            catch (Exception e) { helper = e; }
            sb.Append(string.Format("Assembly Version: {0}", helper));
            sb.Append(Environment.NewLine);

            try { helper = a.GetName().Version.ToString(); }
            catch (Exception e) { helper = e; }
            sb.Append(string.Format("Assembly Version: {0}", helper));
            sb.Append(Environment.NewLine);

            sb.Append(string.Format("Assembly Build Date: {0}", GetAssemblyBuildDate(a, false)));
            sb.Append(Environment.NewLine);

            return sb.ToString();
        }


        public static string SysInfoToString()
        {
            StringBuilder sb = new StringBuilder();

            sb.Append(string.Format("Date and Time: {0}", DateTime.Now));
            sb.Append(Environment.NewLine);

            sb.Append(string.Format("Machine Name: {0}", GetMachineName()));
            sb.Append(Environment.NewLine);

            sb.Append(string.Format("IP Address: {0}", GetCurrentIP()));
            sb.Append(Environment.NewLine);

            sb.Append(string.Format("Current User: {0}", GetUserIdentity()));
            sb.Append(Environment.NewLine);

            sb.Append(Environment.NewLine);

            sb.Append(string.Format("Application Domain: {0}", GetAppDomain()));
            sb.Append(Environment.NewLine);

            return sb.ToString();
        }


        private static string StackFrameToString(StackFrame sf)
        {
            int intParam = 0;
            StringBuilder sb = new StringBuilder();

            MemberInfo mi = sf.GetMethod();
            {
                //-- build method name 
                sb.Append(" ");
                sb.Append(mi.DeclaringType.Namespace);
                sb.Append(".");
                sb.Append(mi.DeclaringType.Name);
                sb.Append(".");
                sb.Append(mi.Name);

                //-- build method params 
                ParameterInfo[] objParameters = sf.GetMethod().GetParameters();
                sb.Append("(");
                intParam = 0;
                foreach (ParameterInfo objParameter in objParameters)
                {
                    intParam += 1;
                    if (intParam > 1) sb.Append(", ");
                    sb.Append(objParameter.Name);
                    sb.Append(" As ");
                    sb.Append(objParameter.ParameterType.Name);
                }
                sb.Append(")");
                sb.Append(Environment.NewLine);

                //-- if source code is available, append location info 
                sb.Append(" ");

                if (string.IsNullOrEmpty(sf.GetFileName()))
                {
                    sb.Append(Path.GetFileName(GetParentAssembly().CodeBase));

                    //-- native code offset is always available 
                    sb.Append(": N ");
                    sb.Append(string.Format("{0:#00000}", sf.GetNativeOffset()));
                }
                else
                {
                    sb.Append(Path.GetFileName(sf.GetFileName()));
                    sb.Append(": line ");
                    sb.Append(string.Format("{0:#0000}", sf.GetFileLineNumber()));
                    sb.Append(", col ");
                    sb.Append(string.Format("{0:#00}", sf.GetFileColumnNumber()));

                    //-- if IL is available, append IL location info 
                    if (sf.GetILOffset() != StackFrame.OFFSET_UNKNOWN)
                    {
                        sb.Append(", IL ");
                        sb.Append(string.Format("{0:#0000}", sf.GetILOffset()));
                    }
                }

                sb.Append(Environment.NewLine);
            }

            return sb.ToString();
        }


        private static string EnhancedStackTrace(StackTrace objStackTrace, string strSkipClassName)
        {
            int intFrame = 0;

            StringBuilder sb = new StringBuilder();

            sb.Append(Environment.NewLine);
            sb.Append("---- Stack Trace ----");
            sb.Append(Environment.NewLine);

            for (intFrame = 0; intFrame <= objStackTrace.FrameCount - 1; intFrame++)
            {
                StackFrame sf = objStackTrace.GetFrame(intFrame);
                MemberInfo mi = sf.GetMethod();

                if (!string.IsNullOrEmpty(strSkipClassName) && mi.DeclaringType.Name.IndexOf(strSkipClassName) > -1)
                {
                    //-- don't include frames with this name 
                }
                else
                {
                    sb.Append(StackFrameToString(sf));
                }
            }

            sb.Append(Environment.NewLine);

            return sb.ToString();
        }


        private static string EnhancedStackTrace(Exception ex)
        {
            StackTrace st = new StackTrace(ex, true);
            return EnhancedStackTrace(st, string.Empty);
        }


        [ThreadStaticAttribute]
        private static int threadExceptionLevel = 0;

        public static string ExceptionInfoString(Exception ex, bool bStackTrace)
        {
            threadExceptionLevel++;
            object helper;

            StringBuilder sb = new StringBuilder();

            if (ex.InnerException != null)
            {
                //-- sometimes the original exception is wrapped in a more relevant outer exception 
                //-- the detail exception is the "inner" exception 
                //-- see http://msdn.microsoft.com/library/default.asp?url=/library/en-us/dnbda/html/exceptdotnet.asp 
                {
                    sb.Append(string.Format("(Inner Exception) Level = {0}", threadExceptionLevel));
                    sb.Append(Environment.NewLine);
                    sb.Append(ExceptionInfoString(ex.InnerException, true));
                    sb.Append(Environment.NewLine);
                    sb.Append(string.Format("(Outer Exception) Level = {0}", threadExceptionLevel));
                    sb.Append(Environment.NewLine);
                }
            }
            else
            {
                //-- get exception-specific information 
                try { helper = ex.Source; }
                catch (Exception e) { helper = e; }
                sb.Append(string.Format("Exception Source: {0}", helper));
                sb.Append(Environment.NewLine);

                try { helper = ex.GetType().FullName; }
                catch (Exception e) { helper = e; }
                sb.Append(string.Format("Exception Type: {0}", helper));
                sb.Append(Environment.NewLine);

                try { helper = ex.Message; }
                catch (Exception e) { helper = e; }
                sb.Append(string.Format("Exception Message: {0}", helper));
                sb.Append(Environment.NewLine);

                try { helper = ex.TargetSite.Name; }
                catch (Exception e) { helper = e; }
                sb.Append(string.Format("Exception Target Site: {0}", helper));
                sb.Append(Environment.NewLine);

                if (bStackTrace)
                {
                    try
                    {
                        string x = EnhancedStackTrace(ex);
                        sb.Append(x);
                    }
                    catch (Exception e)
                    {
                        sb.Append(e.Message);
                    }
                    sb.Append(Environment.NewLine);
                }
            }

            return sb.ToString();
        }


        public static string GetFullExceptionInfo(Exception ex)
        {
            StringBuilder sb = new StringBuilder();

            sb.Append("----- Exception -----");
            sb.Append(Environment.NewLine);
            sb.Append(SysInfoToString());
            sb.Append(Environment.NewLine);

            sb.Append(AssemblyInfoString(null));
            sb.Append(Environment.NewLine);

            sb.Append(ExceptionInfoString(ex, true));
            //            sb.Append(Environment.NewLine);

            return sb.ToString();
        }


        public static string GetShortExceptionInfo(Exception ex)
        {
            StringBuilder sb = new StringBuilder();

            sb.Append(SysInfoToString());
            sb.Append(Environment.NewLine);

            sb.Append(AssemblyInfoString(null));
            sb.Append(Environment.NewLine);

            sb.Append(ExceptionInfoString(ex, false));
            //            sb.Append(Environment.NewLine);

            return sb.ToString();
        }


        public static void SaveExceptionToFile(string sPath, string sMsg)
        {
            StreamWriter m_fsw = null;

            string sDir = sPath;
            string sDirName = string.Format("{0}\\{1}",
                            sPath,
                            DateTime.Now.ToString("yyyyMMdd"));

            try
            {
                if (!Directory.Exists(sDirName))
                    Directory.CreateDirectory(sDirName);

                sDir = sDirName;
            }
            catch
            {
                sDir = sPath;
            }

            try
            {
                string sFileName = string.Format("\\Sys_LogErr_{0}.txt", DateTime.Now.ToString("yyyyMMdd"));

                using (m_fsw = new StreamWriter(sDir + sFileName, true, System.Text.Encoding.Default))
                {
                    m_fsw.WriteLine(sMsg);
                    m_fsw.Flush();
                    m_fsw.Close();
                }
            }
            catch
            {
                if (m_fsw != null)
                    m_fsw.Close();
            }
        }


        public static void SaveExceptionToFile(string sPath, Exception ex, bool bShortInfo = false)
        {
            string sExceptionInfo = (bShortInfo) ? GetShortExceptionInfo(ex) : GetFullExceptionInfo(ex);

            SaveExceptionToFile(sPath, sExceptionInfo);
        }
    }
}
