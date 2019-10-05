namespace ess_api.Core.Model
{
    public class Login
    {
        public string username { get; set; }
        public string password { get; set; }
    }
    public class SocialLogin
    {
        public string google_Id { get; set; }
        public string fb_Id { get; set; }
    }
}
