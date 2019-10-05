namespace ess_api.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial2 : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.Articles", new[] { "Id" });
            DropPrimaryKey("dbo.Articles");
            AlterColumn("dbo.Articles", "Id", c => c.Int(nullable: false, identity: true));
            AddPrimaryKey("dbo.Articles", "Id");
            CreateIndex("dbo.Articles", "Id");
        }
        
        public override void Down()
        {
            DropIndex("dbo.Articles", new[] { "Id" });
            DropPrimaryKey("dbo.Articles");
            AlterColumn("dbo.Articles", "Id", c => c.Int(nullable: false));
            AddPrimaryKey("dbo.Articles", "Id");
            CreateIndex("dbo.Articles", "Id");
        }
    }
}
