using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Libraries.Cryptography.Abstraction
{
    public interface ICryptographyLibrary
    {
        string CalculateHash(string input);
    }
}
