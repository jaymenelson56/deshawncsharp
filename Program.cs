using DogWalker.Models;
using DogWalker.Models.DTOs;

List<Dog> dogs = new List<Dog>
{
    new()
    {
        Id = 1,
        Name = "Ace",
        CityId = 1,
        WalkerId = 1,

    },
    new()
    {
        Id = 2,
        Name = "Krypto",
        CityId = 2,
        WalkerId = 2,

    },
    new()
    {
        Id = 3,
        Name = "Clifford",
        CityId = 3,
        WalkerId = 3,

    },
    new()
    {
        Id = 4,
        Name = "Jerry",
        CityId = 3,
        WalkerId = 4,

    },
    new()
    {
        Id = 5,
        Name = "Bongo",
        CityId = 5,
        WalkerId = 5,

    },
    new()
    {
        Id = 6,
        Name = "Kaya",
        CityId = 5,
        WalkerId = 5,

    },
    new()
    {
        Id = 7,
        Name = "Fox",
        CityId = 5,

    },
    new()
    {
        Id = 8,
        Name = "Wishbone",
        CityId = 4,

    },
    new()
    {
        Id = 9,
        Name = "Skip",
        CityId = 4,

    },
    new()
    {
        Id = 10,
        Name = "Ted",
        CityId = 3,

    }

};
List<City> cities = new List<City>
{
    new()
    {
        Id = 1,
        Name = "Gotham City",
    },
    new()
    {
        Id = 2,
        Name = "Metropolis",
    },
    new()
    {
        Id = 3,
        Name = "Peoria",
    },
    new()
    {
        Id = 4,
        Name = "Long Beach",
    },
    new()
    {
        Id = 5,
        Name = "Murfreesboro",
    },
   

};
List<Walker> walkers = new List<Walker>
{
    new()
    {
        Id = 1,
        Name = "Emily Elizabeth",
    },
    new()
    {
        Id = 2,
        Name = "Batman",
    },
    new()
    {
        Id = 3,
        Name = "Superman",
    },
    new()
    {
        Id = 4,
        Name = "The Flash",
    },
    new()
    {
        Id = 5,
        Name = "Jayme",
    }
};
List<WalkerCity> walkerCities = new List<WalkerCity>
{
    new()
    {
        Id = 1,
        WalkerId = 1,
        CityId = 1
    },
     new()
    {
        Id = 2,
        WalkerId = 1,
        CityId = 2
    },
     new()
    {
        Id = 3,
        WalkerId = 1,
        CityId = 3
    },
     new()
    {
        Id = 4,
        WalkerId = 1,
        CityId = 4
    },
     new()
    {
        Id = 5,
        WalkerId = 1,
        CityId = 5
    },
     new()
    {
        Id = 6,
        WalkerId = 2,
        CityId = 1
    },
     new()
    {
        Id = 7,
        WalkerId = 2,
        CityId = 2
    },
     new()
    {
        Id = 8,
        WalkerId = 3,
        CityId = 2
    },
     new()
    {
        Id = 9,
        WalkerId = 3,
        CityId = 3
    },
     new()
    {
        Id = 10,
        WalkerId = 4,
        CityId = 3
    },
     new()
    {
        Id = 11,
        WalkerId = 5,
        CityId = 5
    },
};

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet("/api/hello", () =>
{
    return new { Message = "Welcome to DeShawn's Dog Walking" };
});


app.Run();
