import { table, timeStamp } from "console";
import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["user", "admin"]);

export const statusEnum = pgEnum("status", [
  "released",
  "upcoming",
  "canceled",
  "in_progress",
]);

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  clerkId: text("clerkId").notNull(),
  firstName: text("firstName").notNull(),
  lastName: text("lastName").notNull(),
  userName: text("userName").notNull().unique(),
  profilepic: text("profilepic"),
});

export const movie = pgTable("movie", {
  id: serial("id").primaryKey(),
  api_id: integer("api_id").unique(),
  imdb_id: text("imdb_id"),
  title: text("title").notNull(),
  release_date: text("release_date"),
  overview: text("plot"),
  poster_path: text("poster_path"),
  director: text("director"),
  status: text("status"),
  runtime: integer("runtime"),
  budget: integer("budget"),
  trailer: text("trailer"),
});

export const tvShow = pgTable("tvShow", {
  id: serial("id").primaryKey(),
  api_id: integer("api_id").unique(),
  imdb_id: text("imdb_id"),
  title: text("title").notNull(),
  first_air_date: text("first_air_date"),
  overview: text("plot"),
  poster_path: text("poster_path"),
  director: text("director"),
  status: text("status"),
  budget: integer("budget"),
  trailer: text("trailer"),
});

export const likes = pgTable(
  "likes",
  {
    userId: integer("user_id").references(() => user.id),
    media_id: integer("media_id").notNull(),
    media_type: text("media_type").notNull(),
    liked_at: timestamp("liked_at").notNull().defaultNow(),
  },
  (t) => ({
    uniqueLike: primaryKey({
      columns: [t.media_id, t.media_type, t.userId],
    }),
  })
);

export const watchlist = pgTable("watchlist", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  userId: integer("user_id").references(() => user.id, {
    onDelete: "cascade",
  }),
  image: text("image").notNull(),
  description: text("description"),
  added_at: timestamp("added_at").notNull().defaultNow(),
});

export const watchlistItems = pgTable(
  "watchlistItems",
  {
    id: serial("id").primaryKey(),
    watchlist_id: integer("watchlist_id").references(() => watchlist.id, {
      onDelete: "cascade",
    }),
    media_id: integer("media_id").notNull(),
    media_type: text("media_type").notNull(),
  },
  (t) => ({
    uniqueMediaTypeWatchlist: uniqueIndex("unique_media_type_watchlist").on(
      t.media_id,
      t.media_type,
      t.watchlist_id
    ),
  })
);

export const actor = pgTable("actor", {
  id: serial("id").primaryKey(),
  api_id: integer("api_id").unique(),
  name: text("name").notNull(),
  gender: text("gender"),
  image: text("image"),
});

export const cast = pgTable("cast", {
  id: serial("id").primaryKey(),
  movieId: integer("movie_id").references(() => movie.id, {
    onDelete: "cascade",
  }),
  actorId: integer("actor_id").references(() => actor.id, {
    onDelete: "cascade",
  }),
  character: text("character"),
  known_for_department: text("known_for_department"),
});

export const tvCast = pgTable("tvCast", {
  id: serial("id").primaryKey(),
  tvShowId: integer("tvShow_id").references(() => tvShow.id, {
    onDelete: "cascade",
  }),
  actorId: integer("actor_id").references(() => actor.id, {
    onDelete: "cascade",
  }),
  character: text("character"),
  known_for_department: text("known_for_department"),
});

export const genre = pgTable("genre", {
  id: serial("id").primaryKey(),
  api_id: integer("api_id").unique().notNull(),
  name: text("name").notNull(),
});

export const favoriteGenres = pgTable("favoriteGenres", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => user.id, {
    onDelete: "cascade",
  }),
  genreId: integer("genre_id").references(() => genre.api_id, {
    onDelete: "cascade",
  }),
});

export const movieGenre = pgTable(
  "movieGenre",
  {
    movieId: integer("movie_id").references(() => movie.id, {
      onDelete: "cascade",
    }),
    genreId: integer("genre_id").references(() => genre.api_id, {
      onDelete: "cascade",
    }),
  }
  // (table) => {
  //   return {
  //     pk: primaryKey({
  //       columns: [table.movieId, table.genreId],
  //     }),
  //   };
  // }
);

export const tvShowGenre = pgTable(
  "tvShowGenre",
  {
    tvShowId: integer("tvShow_id").references(() => tvShow.id, {
      onDelete: "cascade",
    }),
    genreId: integer("genre_id").references(() => genre.api_id, {
      onDelete: "cascade",
    }),
  },
  (table) => {
    return {
      pk: primaryKey({
        columns: [table.tvShowId, table.genreId],
      }),
    };
  }
);
