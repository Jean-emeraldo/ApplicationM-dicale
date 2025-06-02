using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using MediCare.Data;
using MediCare.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();

var rawConnectionString = builder.Configuration.GetConnectionString("DefaultConnection");
if (string.IsNullOrWhiteSpace(rawConnectionString))
    throw new Exception("La chaîne de connexion 'DefaultConnection' est absente ou vide dans appsettings.json.");

var dbPassword = Environment.GetEnvironmentVariable("DB_PASSWORD");
if (string.IsNullOrWhiteSpace(dbPassword))
    throw new Exception("La variable d'environnement 'DB_PASSWORD' n'est pas définie ou vide.");

var connectionString = rawConnectionString.Replace("{DB_PASSWORD}", dbPassword);

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
    app.UseDeveloperExceptionPage();
else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.UseSession();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
