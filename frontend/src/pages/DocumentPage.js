import React, { useEffect, useState } from "react";
import Editor from "../components/Editor";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function DocumentPage() {
  const { id: documentId } = useParams();
  const [title, setTitle] = useState("Loading...");
const [lastEditedBy, setLastEditedBy] = useState("");

  const [saveStatus, setSaveStatus] = useState("All changes saved ✅");
  const [collaborators, setCollaborators] = useState([]);
const [newCollaborator, setNewCollaborator] = useState("");
const [isOwner, setIsOwner] = useState(false);
const navigate = useNavigate();


  useEffect(() => {
  fetch(`http://localhost:4000/api/documents/${documentId}`, {
    credentials: "include",
  })
    .then((res) => {
      if (res.status === 401) navigate("/login");
      return res.json();
    })
    .then((data) => {
      if (data.title) setTitle(data.title);
      if (data.lastEditedBy) setLastEditedBy(data.lastEditedBy);
      if (data.collaborators) setCollaborators(data.collaborators);

      const currentUsername = sessionStorage.getItem("username");
      if (data.owner && currentUsername === data.owner) {
        setIsOwner(true);
      }
    })
    .catch((err) => {
      console.error("Error loading document:", err);
      setTitle("Untitled Document");
    });
}, [documentId, navigate]);


  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setSaveStatus("Saving...");

    fetch(`http://localhost:4000/api/documents/${documentId}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Save failed");
        setSaveStatus("All changes saved ✅");
      })
      .catch(() => {
        setSaveStatus("⚠️ Error saving");
      });
  };

  return (
  <div className="relative z-10 max-w-7xl mx-auto px-4 pt-1 py-10 ">
    <h1 className="text-3xl font-bold mb-6 text-center text-light-text dark:text-dark-text">
      📝 Edit:{" "}
      <span className="text-light-accent dark:text-dark-accent ">{title}</span>
    </h1>

    <input
      className="w-full p-3 text-2xl font-semibold border border-white/20 dark:border-slate-700 rounded-xl bg-white/80 dark:bg-dark-card/80 text-light-text dark:text-dark-text shadow-lg transition-all duration-200 focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent focus:scale-[1.01] mb-6 dark:shadow-[0_0_25px_#00ffe7]"
      value={title}
      onChange={handleTitleChange}
    />

    <div className="text-sm mb-6 text-right text-gray-500 dark:text-gray-400 italic space-y-1 animate-fade-in">
      <p>{saveStatus}</p>
      {lastEditedBy && (
        <p>
           Last edited by:{" "}
          <span className="font-semibold text-black dark:text-white">
            {lastEditedBy}
          </span>
        </p>
      )}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

      {/* 📋 Left Panel - Collaborators */}
      {isOwner && (
        <div className="col-span-12 lg:col-span-4 space-y-6 p-4 rounded-2xl bg-white/50 dark:bg-dark-card/50 border border-white/30 dark:border-slate-700 shadow-lg transition-all duration-300 dark:shadow-[0_0_25px_#00ffe7]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetch(
                `http://localhost:4000/api/documents/${documentId}/collaborators`,
                {
                  method: "POST",
                  credentials: "include",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ username: newCollaborator }),
                }
              )
                .then((res) => {
                  if (!res.ok) throw new Error("Failed to add collaborator");
                  return res.json();
                })
                .then((data) => {
                  setCollaborators(data.collaborators);
                  setNewCollaborator("");
                })
                .catch((err) => alert(err.message));
            }}
            className="flex flex-col sm:flex-row gap-2 "
          >
            <input
              type="text"
              placeholder="Enter username to add..."
              className="flex-grow p-2 border rounded-lg bg-white/80 dark:bg-dark-card/80 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent transition-all duration-200"
              value={newCollaborator}
              onChange={(e) => setNewCollaborator(e.target.value)}
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-light-accent dark:bg-dark-accent text-white rounded hover:scale-[1.05] transition-transform duration-200"
            >
              Add
            </button>
          </form>

          <div>
            <h3 className="font-semibold mb-2">Collaborators:</h3>
            <ul className="space-y-1">
              {collaborators.length === 0 && (
                <li className="text-gray-500">No collaborators yet.</li>
              )}
              {collaborators.map((c, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between p-2 bg-white/60 dark:bg-dark-card/70 rounded-lg shadow-sm"
                >
                  <span className="text-light-text dark:text-dark-text font-medium">
                    {c}
                  </span>
                  <button
                    onClick={() => {
                      fetch(
                        `http://localhost:4000/api/documents/${documentId}/collaborators`,
                        {
                          method: "DELETE",
                          credentials: "include",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ username: c }),
                        }
                      )
                        .then((res) => {
                          if (!res.ok)
                            throw new Error("Failed to remove collaborator");
                          return res.json();
                        })
                        .then((data) => setCollaborators(data.collaborators))
                        .catch((err) => alert(err.message));
                    }}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* ✍️ Right Panel - Editor */}
      <div className="col-span-12 lg:col-span-8 dark:shadow-[0_0_25px_#00ffe7]">

        <Editor
          documentId={documentId}
          title={title}
          setLastEditedBy={setLastEditedBy}
        />
      </div>
    </div>
  </div>
);

}
