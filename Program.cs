using DogWalker.Models;
using DogWalker.Models.DTOs;
using Microsoft.AspNetCore.HttpLogging;

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


app.MapGet("/api/dogs", () => 
{
    return dogs.Select(d => new DogDTO
    {
        Id = d.Id,
        Name = d.Name,
        CityId = d.CityId,
        City = new CityDTO
        {
            Id = cities.FirstOrDefault(c => c.Id == d.CityId).Id,
            Name = cities.FirstOrDefault(c => c.Id == d.CityId).Name
        },
        WalkerId = d.WalkerId ,
        Walker = d.WalkerId != null ? new WalkerDTO
        {
            Id = walkers.FirstOrDefault(w => w.Id == d.WalkerId).Id,
            Name = walkers.FirstOrDefault(w => w.Id == d.WalkerId).Name
        } : null
    });
});

app.MapGet("/api/dogs/{id}", (int id) =>
{
    Dog dog = dogs.FirstOrDefault(d => d.Id == id);
    if (dog == null)
    {
        return Results.NotFound();
    }

    City city = cities.FirstOrDefault(c => c.Id == dog.CityId);
    Walker walker = walkers.FirstOrDefault(w => w.Id == dog.WalkerId);

    return Results.Ok(new DogDTO
    {
        Id = dog.Id,
        Name = dog.Name,
        CityId = dog.CityId,
        City = new CityDTO
        {
            Id = city.Id,
            Name = city.Name
        },
        WalkerId = dog.WalkerId ,
        Walker = dog.WalkerId != null ? new WalkerDTO
        {
            Id = walker.Id,
            Name = walker.Name
        } : null
    });
});

app.MapGet("/api/cities", () =>
{
    List<CityDTO> citiesWithWalkers = cities.Select((City city) =>
    {
        List<Walker> walkersWorking = walkerCities
        .Where(wc => wc.CityId == city.Id)
        .Select(wc => walkers.FirstOrDefault((Walker w) => w.Id == wc.WalkerId))
        .ToList();

        return new CityDTO
        {
            Id = city.Id,
            Name = city.Name,
            Walkers = walkersWorking.Select((Walker w) => new WalkerDTO
            {
                Id = w.Id,
                Name = w.Name
            }).ToList()
        };
    }).ToList();
    return citiesWithWalkers;
});

app.MapPost("/api/dogs", (Dog dog) =>
{
    City city = cities.FirstOrDefault(c => c.Id == dog.CityId);
    Walker walker = walkers.FirstOrDefault(w => w.Id == dog.WalkerId);
    dog.Id = dogs.Max(d => d.Id) + 1;
    dogs.Add(dog);
    return Results.Created($"/api/dogs/{dog.Id}", new DogDTO
    {
         Id = dog.Id,
        Name = dog.Name,
        CityId = dog.CityId,
        City = new CityDTO
        {
            Id = city.Id,
            Name = city.Name
        },
        WalkerId = dog.WalkerId ,
        Walker = dog.WalkerId != null ? new WalkerDTO
        {
            Id = walker.Id,
            Name = walker.Name
        } : null
    });
});

app.MapGet("/api/walkers", () =>
{
    List<WalkerDTO> walkerWithCities = walkers.Select((Walker walker) =>
    {
        List<City> citiesWalked = walkerCities
        .Where(wc => wc.WalkerId == walker.Id)
        .Select(wc => cities.FirstOrDefault((City c) => c.Id == wc.CityId))
        .ToList();

        return new WalkerDTO
        {
            Id = walker.Id,
            Name = walker.Name,
            Cities = citiesWalked.Select((City c) => new CityDTO 
            {
                Id = c.Id,
                Name = c.Name
            }).ToList()
        };
    }).ToList();

    return walkerWithCities;
});

app.MapGet("/api/walkers/{id}", (int id) =>
{
    Walker walker = walkers.FirstOrDefault(w => w.Id == id);
    if (walker == null)
    {
        return Results.NotFound();
    }
    List<City> citiesWalked = walkerCities
    .Where(wc => wc.WalkerId == walker.Id)
    .Select(wc => cities.FirstOrDefault(c => c.Id == wc.CityId))
    .ToList();

    WalkerDTO walkerDTO = new WalkerDTO
    {
        Id = walker.Id,
        Name = walker.Name,
        Cities = citiesWalked.Select(c => new CityDTO
        {
            Id = c.Id,
            Name = c.Name
        }).ToList()

    };

    return Results.Ok(walkerDTO);

});

app.MapPut("/api/dogs/{id}/assign", (int id, int walkerId) =>
{
    Dog dogToWalk = dogs.FirstOrDefault(d => d.Id == id);
    if(dogToWalk == null)
    {
        return Results.NotFound();
    }
    dogToWalk.WalkerId = walkerId;

    return Results.Ok();
});

app.MapPost("/api/cities", (City city) =>
{
    city.Id = cities.Max(c => c.Id) + 1;
    cities.Add(city);
    return Results.Created($"api/cities/{city.Id}", new CityDTO
    {
        Id = city.Id,
        Name = city.Name
    });
});

app.Run();
