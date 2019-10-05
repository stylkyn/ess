namespace ess_api.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Articles",
                c => new
                    {
                        Id = c.Int(nullable: false),
                        Name = c.String(nullable: false),
                        Description = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Categories", t => t.Id)
                .Index(t => t.Id);
            
            CreateTable(
                "dbo.Categories",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Description_Id = c.Long(),
                        Name_Id = c.Long(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Translations", t => t.Description_Id)
                .ForeignKey("dbo.Translations", t => t.Name_Id, cascadeDelete: true)
                .Index(t => t.Description_Id)
                .Index(t => t.Name_Id);
            
            CreateTable(
                "dbo.Translations",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.TranslationDetails",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Value = c.String(nullable: false),
                        Language_Id = c.Int(nullable: false),
                        Translation_Id = c.Long(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Languages", t => t.Language_Id, cascadeDelete: true)
                .ForeignKey("dbo.Translations", t => t.Translation_Id)
                .Index(t => t.Language_Id)
                .Index(t => t.Translation_Id);
            
            CreateTable(
                "dbo.Languages",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Code = c.String(maxLength: 8),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Categories", "Name_Id", "dbo.Translations");
            DropForeignKey("dbo.Categories", "Description_Id", "dbo.Translations");
            DropForeignKey("dbo.TranslationDetails", "Translation_Id", "dbo.Translations");
            DropForeignKey("dbo.TranslationDetails", "Language_Id", "dbo.Languages");
            DropForeignKey("dbo.Articles", "Id", "dbo.Categories");
            DropIndex("dbo.TranslationDetails", new[] { "Translation_Id" });
            DropIndex("dbo.TranslationDetails", new[] { "Language_Id" });
            DropIndex("dbo.Categories", new[] { "Name_Id" });
            DropIndex("dbo.Categories", new[] { "Description_Id" });
            DropIndex("dbo.Articles", new[] { "Id" });
            DropTable("dbo.Languages");
            DropTable("dbo.TranslationDetails");
            DropTable("dbo.Translations");
            DropTable("dbo.Categories");
            DropTable("dbo.Articles");
        }
    }
}
