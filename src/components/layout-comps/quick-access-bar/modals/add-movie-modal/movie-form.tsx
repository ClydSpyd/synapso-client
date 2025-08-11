/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { TextInput, Button } from "@mantine/core";
import { API } from "@/api";
import { cn } from "@/lib/utils";

export default function MovieForm({
  handleFormSubmission,
}: {
  handleFormSubmission: (movie: OMDBMovie) => void;
}) {
  const [textInput, setTextInput] = useState<string>("");
  const [results, setResults] = useState<OMDBMovie[]>([]);
  const [submittingSearch, setSubmittingSearch] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setError(null);
    setSubmittingSearch(true);
    setResults([]);
    const { data, error } = await API.omdb.searchMovie(textInput);
    console.log({ data, error });

    if (error) {
      setError(error);
    } else if (data) {
      setError(null);
      console.log(data);
      setResults(data);
    }
    setSubmittingSearch(false);
  };

  return (
    <>
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          if (textInput.length > 3) handleSearch();
        }}
        className="w-full flex flex-col gap-2 items-end cursor-pointer"
      >
        <div className="grow w-full h-full flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <p className="text-xs">Search Movies</p>
            <TextInput
              data-autofocus
              classNames={{
                input: "focus:!border-[var(--accent-three)]",
              }}
              className="col-span-2"
              placeholder="Enter movie title"
              value={textInput}
              name="title"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTextInput(e.target.value)
              }
            />
          </div>
          <Button
            onClick={() => {
              if (textInput.length > 3) handleSearch();
            }}
            loading={submittingSearch}
            className="button-zen h-[50px]"
            fullWidth
            variant="gradient"
            gradient={{ from: "indigo", to: "grape", deg: 147 }}
          >
            SUBMIT
          </Button>
        </div>
        <div
          className={cn(
            "w-full transition-all duration-500 ease-in-out flex flex-wrap gap-2",
            results.length > 0 ? "min-h-[200px]" : "min-h-0"
          )}
        >
          {error ? (
            <p className="w-full text-center text-red-500 text-xs">{error}</p>
          ) : (
            results.map((item: OMDBMovie) => (
              <div
                onClick={() => {
                  handleFormSubmission(item);
                }}
                key={item.imdbID}
                className="flex flex-col justify-start text-center items-center w-[31%]"
              >
                <div className="bg-indigo-400/40 w-full h-[200px] box-border rounded-md overflow-hidden text-sm">
                  <img
                    className="w-full h-full object-fill"
                    src={item.Poster}
                    alt={item.Title}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        "/images/poster-placeholder-movie.png";
                    }}
                  />
                </div>
                <p className="text-sm font-semibold">
                  {item.Title} ({item.Year})
                </p>
              </div>
            ))
          )}
        </div>
      </form>
    </>
  );
}
