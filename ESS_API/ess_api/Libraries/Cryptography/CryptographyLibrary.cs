using ess_api.Core.Constant;
using Jose;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Libraries.Cryptography
{
    public class CryptographyLibrary
    {
        private readonly byte[] _hashSalt;

        public CryptographyLibrary()
        {
            _hashSalt = Encoding.UTF8.GetBytes(CryptographyConstants.HashSalt);
        }

        public string CalculateHash(string input) { 
            string hash;
            using (var hmac = new HMACSHA512())
            {
                byte[] inputByte = Encoding.ASCII.GetBytes(input);
                hash = Convert.ToBase64String(PBKDF2.DeriveKey(inputByte, _hashSalt, 1000, 512 / 8, hmac));
            }

            return hash;
        }
    }
}
