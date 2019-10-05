using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Xml.Serialization;

namespace ess_api
{
    public static class clsLogError
    {
        public enum ASCII : byte
        {
            NULL = 0x00, SOH = 0x01, STX = 0x02, ETX = 0x03, EOT = 0x04, ENQ = 0x05,
            ACK = 0x06, BELL = 0x07, BS = 0x08, TAB = 0x09, LF = 0x0A, VT = 0x0B,
            FF = 0x0C, CR = 0x0D, SO = 0x0E, SI = 0x0F, DC1 = 0x11, DC2 = 0x12,
            DC3 = 0x13, DC4 = 0x14, NAK = 0x15, SYN = 0x16, ETB = 0x17, CAN = 0x18,
            EM = 0x19, SUB = 0x1A, ESC = 0x1B, FS = 0x1C, GS = 0x1D, RS = 0x1E,
            US = 0x1F, SP = 0x20, DEL = 0x7F
        }

        public static string sLogPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "logs/log.txt");
        public static string m_sLogPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "LOG_ERR");
        public static string m_sLogErrFile = "LogErr_";

        private static StreamWriter m_fsw;

        /// <summary>
        /// Zaloguje vyjimku
        /// </summary>
        /// <param name="ex"></param>
        public static void WriteLog(Exception ex)
        {
            using (StreamWriter sw = new StreamWriter(sLogPath, true))
            {
                sw.WriteLine(DateTime.Now.ToString() + ":" + ex.Source.ToString().Trim());
                sw.WriteLine(ex.Message.ToString().Trim() + "; " + ex.StackTrace.ToString());
            }
        }

        /// <summary>
        /// Zaloguje libovolny text
        /// </summary>
        /// <param name="sMessage"></param>
        public static void WriteLog(string sMessage)
        {
            using (StreamWriter sw = new StreamWriter(sLogPath, true))
            {
                sw.WriteLine(DateTime.Now.ToString() + ":" + sMessage);
            }
        }


        /// <summary>
        /// Zaloguje vyjimku
        /// </summary>
        /// <param name="ex"></param>
        public static void WriteModuleLog(string sModule, Exception ex)
        {
            try
            {
                string sDir = GetDirName();

                string sFileName = string.Format("\\{0}{1}.txt", m_sLogErrFile, DateTime.Now.ToString("yyyyMMdd"));

                using (m_fsw = new StreamWriter(sDir + sFileName, true, System.Text.Encoding.Default))
                //using (m_fsw = new StreamWriter(sLogPath, true, System.Text.Encoding.Default))
                {
                    string sTmpLog = string.Format("{0} {1}.{2:000}\t{3}\t{4}",
                            DateTime.Now.ToString("yyyy-MM-dd"),
                            DateTime.Now.ToString("HH:mm:ss"),
                            DateTime.Now.Millisecond,
                            sModule,
                            ex.Message);

                    m_fsw.WriteLine(sTmpLog);

                    //m_fsw.WriteLine(ex.Source.ToString().Trim());
                    //m_fsw.WriteLine(ex.StackTrace.ToString());

                    m_fsw.Flush();
                    m_fsw.Close();
                }
            }
            catch (Exception ex1)
            {
                WriteLog(ex1);

                if (m_fsw != null)
                    m_fsw.Close();
            }
        } // WriteModuleLog


        /// <summary>
        /// Ulozeni LOG zpravy do souboru
        /// </summary>
        /// <param name="sModule">modul</param>
        /// <param name="sLog">zprava</param>
        /// <returns>bResult</returns>
        public static void WriteModuleLog(string sModule, string sLog)
        {
            //bool bResult = false;

            try
            {
                string sDir = GetDirName();
                string sConvLog = ConvertToASCII(sLog);

                string sFileName = string.Format("\\{0}{1}.txt", m_sLogErrFile, DateTime.Now.ToString("yyyyMMdd"));

                using (m_fsw = new StreamWriter(sDir + sFileName, true, System.Text.Encoding.Default))
                //using (m_fsw = new StreamWriter(sLogPath, true, System.Text.Encoding.Default))
                {
                    string sTmpLog = string.Format("{0} {1}.{2:000}\t{3}\t{4}",
                                            DateTime.Now.ToString("yyyy-MM-dd"),
                                            DateTime.Now.ToString("HH:mm:ss"),
                                            DateTime.Now.Millisecond,
                                            sModule,
                                            sConvLog);

                    m_fsw.WriteLine(sTmpLog);
                    m_fsw.Flush();
                    m_fsw.Close();
                }

                //bResult = true;
                //return bResult;
            }
            catch (Exception ex)
            {
                WriteLog(ex);

                if (m_fsw != null)
                    m_fsw.Close();

                //return bResult;
            }
        } // WriteModuleLog


        /// <summary>
        /// Test adresare pro ulozeni LOG souboru
        /// </summary>
        /// <returns></returns>
        private static string GetDirName()
        {
            string sDir = m_sLogPath;
            string sDirName = string.Format("{0}\\{1}",
                    m_sLogPath,
                    DateTime.Now.ToString("yyyyMMdd"));

            try
            {
                if (!Directory.Exists(sDirName))
                    Directory.CreateDirectory(sDirName);

                sDir = sDirName;
            }
            catch (Exception ex)
            {
                WriteLog(ex);

                sDir = m_sLogPath;
            }

            return sDir;
        } // GetDirName


        /// <summary>
        /// WriteToXmlFile
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sPreFix"></param>
        /// <param name="sPostFix"></param>
        /// <param name="objectToWrite"></param>
        /// <param name="append"></param>
        public static void WriteToXmlFile<T>(string sPreFix, string sPostFix, T objectToWrite, bool append = false) where T : new()
        {
            TextWriter writer = null;

            string sDir = GetDirName();

            try
            {
                string sFileName = string.Format("\\{0}_{1}_{2}.txt", sPreFix, sPostFix, DateTime.Now.ToString("yyyyMMdd_HHmmss"));

                var serializer = new XmlSerializer(typeof(T));
                writer = new StreamWriter(sDir + sFileName, append);
                serializer.Serialize(writer, objectToWrite);
            }
            catch (Exception ex)
            {
                WriteModuleLog("WriteToXmlFile", ex);
            }
            finally
            {
                if (writer != null)
                    writer.Close();
            }
        } // WriteToXmlFile


        /// <summary>
        /// Convert chars 0x00 - 0x20 to ASCII <XXX>
        /// </summary>
        /// <param name="sConvStr">string to convert to ASCII (chars 0x00 - 0x20)</param>
        /// <returns>converted string</returns>
        public static string ConvertToASCII(string sConvStr)
        {
            sConvStr = sConvStr.Replace(string.Format("{0}", (char)ASCII.CR), "<CR>");      // 0x0D
            sConvStr = sConvStr.Replace(string.Format("{0}", (char)ASCII.LF), "<LF>");      // 0x0A
            sConvStr = sConvStr.Replace(string.Format("{0}", (char)ASCII.TAB), "<TAB>");      // 0x09
            //sConvStr = sConvStr.Replace(string.Format("{0}", (char)ASCII.SP), "<SP>");      // 0x20

            //sConvStr = sConvStr.Replace(string.Format("{0}", (char)ASCII.STX), "<STX>");    // 0x02
            //sConvStr = sConvStr.Replace(string.Format("{0}", (char)ASCII.ETX), "<ETX>");    // 0x03

            //sConvStr = sConvStr.Replace(string.Format("{0}", (char)ASCII.ESC), "<ESC>");    // 0x1B
            //sConvStr = sConvStr.Replace(string.Format("{0}", (char)ASCII.ENQ), "<ENQ>");    // 0x05
            //sConvStr = sConvStr.Replace(string.Format("{0}", (char)ASCII.ACK), "<ACK>");    // 0x06
            //sConvStr = sConvStr.Replace(string.Format("{0}", (char)ASCII.SUB), "<SUB>");    // 0x1A
            //sConvStr = sConvStr.Replace(string.Format("{0}", (char)ASCII.FS), "<FS>");      // 0x1C
            //sConvStr = sConvStr.Replace(string.Format("{0}", (char)ASCII.EM), "<EM>");      // 0x19
            //sConvStr = sConvStr.Replace(string.Format("{0}", (char)ASCII.GS), "<GS>");      // 0x1D
            //sConvStr = sConvStr.Replace(string.Format("{0}", (char)ASCII.NAK), "<NAK>");    // 0x15
            //sConvStr = sConvStr.Replace(string.Format("{0}", (char)ASCII.DC4), "<DC4>");    // 0x10

            //sConvStr = sConvStr.Replace(string.Format("{0}", (char)ASCII.CAN), "<0x18>");    // 0x18

            return sConvStr;
        } // ConvertToASCII
    }
}