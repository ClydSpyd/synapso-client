/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { TextInput, Button, Group, Checkbox } from "@mantine/core";
import { API } from "@/api";
import { cn } from "@/lib/utils";

export default function MovieForm({
  handleFormSubmission,
  submitError,
  searchType,
  setSearchType,
}: {
  defaultData?: OMDBMovie;
  searchType?: MediaType;
  setSearchType?: (type: MediaType) => void;
  handleFormSubmission: (imdbId: string, mediaType: MediaType) => void;
  submitError?: string | null;
}) {
  const [textInput, setTextInput] = useState<string>("");
  const [results, setResults] = useState<OMDBMovie[]>([]);
  const [submittingSearch, setSubmittingSearch] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setError(null);
    setSubmittingSearch(true);
    setResults([]);
    const { data, error } = await API.omdb.searchMovie(textInput, searchType);
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

  useEffect(() => {
    setResults([]);
    setError(null);
    setTextInput("");
  }, [searchType]);

  return (
    <>
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          if (textInput.length > 3) handleSearch();
        }}
        className="w-full flex flex-col gap-2"
      >
        <div className="grow w-full h-full flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <Group className="mb-2">
              <Checkbox
                value="movie"
                label="Movie"
                className="text-sm"
                color="grape"
                size="sm"
                checked={searchType === "movie"}
                onChange={() => {
                  setSearchType("movie");
                }}
              />
              <Checkbox
                value="series"
                label="Series"
                color="grape"
                size="sm"
                checked={searchType === "series"}
                onChange={() => {
                  setSearchType("series");
                }}
              />
            </Group>
            <TextInput
              data-autofocus
              classNames={{
                input: "focus:!border-[var(--accent-three)]",
              }}
              className="col-span-2"
              placeholder={`Enter ${
                searchType === "movie" ? "Movie" : "Series"
              } Title`}
              value={textInput}
              name="title"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTextInput(e.target.value)
              }
            />
          </div>
          <Button
            type="submit"
            loading={submittingSearch}
            className="button-zen h-[50px]"
            fullWidth
            variant="gradient"
            gradient={{ from: "indigo", to: "grape", deg: 147 }}
          >
            SUBMIT
          </Button>
        </div>
        {submitError && (
          <p className="text-xs mx-auto text-center mb-1 text-red-500">
            {submitError}
          </p>
        )}
        <div
          className={cn(
            "w-full transition-all duration-500 ease-in-out flex flex-wrap gap-2",
            results.length > 0 ? "min-h-[200px]" : "min-h-0"
          )}
        >
          {error ? (
            <p className="w-full text-center text-red-500 text-xs">{error}</p>
          ) : (
            results.map((item: OMDBMovie, idx: number) => (
              <div
                onClick={() => {
                  handleFormSubmission(item.imdbID, searchType);
                }}
                key={item.imdbID + "_" + idx}
                className="flex flex-col justify-start text-center items-center w-[31%] group cursor-pointer"
              >
                <div className="bg-indigo-400/40 w-full h-[200px] box-border rounded-md overflow-hidden text-sm  border-2 border-transparent group-hover:border-indigo-500 transition-colors">
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
