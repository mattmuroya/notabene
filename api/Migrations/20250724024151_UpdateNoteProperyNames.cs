using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class UpdateNoteProperyNames : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ModifiedOn",
                table: "Notes",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "Notes",
                newName: "CreatedAt");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                table: "Notes",
                newName: "ModifiedOn");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "Notes",
                newName: "CreatedOn");
        }
    }
}
