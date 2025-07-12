import { useState, ChangeEvent, KeyboardEvent } from "react";
import { Header } from "@/components/Header";
import { TAGS } from "@/constants/tags";
import axios from "@/api/axios" 


export default function AskQuestionPage() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");
  const [media, setMedia] = useState<File | null>(null);

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleMediaUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMedia(e.target.files[0]);
    }
  };

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const canPost = title.trim() && description.trim() && tags.length > 0;

  const handleSubmit = async () => {
    if (!canPost) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", JSON.stringify(tags));
    if (media) formData.append("media", media);
      try{
          await axios.post('/questions', {
  title,
  description,
  tags,
  media
}, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
});

          alert('Question posted');
        } 
      catch (err) {
        alert('Failed to post question');
      }
    };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="max-w-3xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold">Ask a Question</h1>

        {/* Title */}
        <div>
          <label className="block font-medium mb-1">Question Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Why does React use a virtual DOM?"
            className="w-full px-4 py-2 bg-background text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-muted-foreground"
          />
        </div>

        {/* Description and Media */}
        <div>
          <label className="block font-medium mb-1">Detailed Description</label>
          <textarea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Explain your question in detail..."
            className="w-full px-4 py-2 bg-background text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-muted-foreground resize-vertical"
          />
          <div className="mt-3">
            <label className="block font-medium mb-1">Upload Media (optional)</label>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleMediaUpload}
              className="block w-full text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {media && (
              <p className="text-sm text-muted-foreground mt-1">Selected: {media.name}</p>
            )}
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block font-medium mb-1">
            Tags <span className="text-red-500">*</span>
          </label>
          {/* Tags */}
          <div className="relative">
            

            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder="Add a tag and press Enter"
                className="flex-1 px-4 py-2 bg-background text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-muted-foreground"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
            </div>

            {/* Tag suggestions dropdown */}
            {tagInput.trim().length > 0 && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow z-10 max-h-60 overflow-y-auto">

                {TAGS.filter(
                  (tag) =>
                    tag.name.toLowerCase().includes(tagInput.toLowerCase()) &&
                    !tags.includes(tag.name)
                ).map((tag, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setTags([...tags, tag.name]);
                      setTagInput("");
                    }}
                    className="px-4 py-2 text-sm hover:bg-blue-50 cursor-pointer flex items-center gap-2"
                  >
                    <tag.icon className="w-4 h-4 text-muted-foreground" />
                    {tag.name}
                  </div>
                ))}
              </div>
            )}

            {/* Selected tags */}
            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-muted px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-red-500 hover:text-red-700 font-bold"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>


        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!canPost}
          className={`w-full py-3 text-white font-semibold rounded-md transition-colors ${canPost ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
            }`}
        >
          Post Your Question
        </button>
      </main>
    </div>
  );
}