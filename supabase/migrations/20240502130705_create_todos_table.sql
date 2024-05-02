 -- Create the table
 create table notes (
   id serial primary key,
   title text
 );

 -- Insert some sample data
 insert into notes (title)
 values
   ('Today I created a Supabase project.'),
   ('I added some data and queried it from Next.js.'),
   ('It was awesome!');