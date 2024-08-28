"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createNewWatchListItem } from "@/app/actions";
import { toast } from "react-toastify";
import { revalidatePath } from "next/cache";

const FormSchema = z.object({
  watchlistId: z.string({
    required_error: "required",
  }),
});
export function SelectForm({
  watchlists,
  media,
  movieId,
  movieTitle,
  onClick,
}: {
  watchlists: any;
  media: string;
  movieId: number;
  movieTitle: string;
  onClick: () => void;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    onClick();
    createNewWatchListItem(
      parseInt(data.watchlistId),
      movieId,
      movieTitle,
      media
    );

    toast.success("Added to watchlist");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
        <div className="grid grid-cols-2 gap-4 w-full ">
          <FormField
            control={form.control}
            name="watchlistId"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-primary/90 border-none focus:border-none active:border-none outline-none active:outline-none focus:outline-none focus-ring-0">
                      <SelectValue className="" placeholder="Select a list" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-primary border-none">
                    {watchlists &&
                      watchlists.map((watchlist: any) => (
                        <SelectItem
                          className=" text-white focus:bg-secondary/90 focus:text-black focus:cursor-pointer"
                          key={watchlist.id}
                          value={watchlist.id.toString()}
                        >
                          {watchlist.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Add to list </Button>
        </div>
      </form>
    </Form>
  );
}
