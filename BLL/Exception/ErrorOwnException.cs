using System;

namespace BLL.Exception
{
    public class ErrorOwnException : System.Exception
    {
        public ErrorOwnException()
          : base()
        {

        }

        public ErrorOwnException(String message)
            : base(message)
        {
        }
    }
}
