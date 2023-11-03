"use client";
import { Inbox } from "lucide-react";
// Client Components allows you to write interactive UI that can be rendered on the client at request time.
// Docs: https://nextjs.org/docs/app/building-your-application/rendering/client-components
import React from "react";
// react-dropzone docs: https://react-dropzone.js.org/
import { useDropzone } from "react-dropzone";

type Props = {};

const FileUpload = (props: Props) => {
  // Props from react-dropzone that properly handles file uploads.
  // The object parameter in useDropZone tells it how to behave. I.e What files do we want to accept from the users?
  const { getRootProps, getInputProps } = useDropzone({
    // Accept only .pdf files.
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      // Upload to AWS S3. Doc: https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html
      console.log(acceptedFiles);
    },
  });

  return (
    <div className="p-2 bg-white rounded-xl">
      <div
        {...getRootProps({
          className:
            "border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col",
        })}
      >
        <input {...getInputProps()} />
        <>
          <Inbox className="w-10 h-10 text-blue-500" />
          <p className="mt-2 text-sm text-slate-400">Drop PDF Here</p>
        </>
      </div>
    </div>
  );
};

export default FileUpload;
