import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { useCallback, useState, useMemo } from "react";
import Dropzone from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import { Storage } from "@aws-amplify/storage";

export default function Home() {
    const [status, setStatus] = useState("Drag 'n' drop some files here, or click to select files.");

  return (
    <div className="font-inter">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="border-dashed	border-green-500 rounded-lg border-4 p-24 h-screen flex items-center place-content-center">
        <Dropzone
          onDrop={async (acceptedFiles) => {
            setStatus("Hold on!")
            console.log(acceptedFiles);
            try {
              const { key } = await Storage.put(uuidv4(), acceptedFiles, {
                level: "private",
                progressCallback(progress) {
                  console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
                },
              });

              console.log("S3 Object key", key);
              setStatus("Done. Your file has been sent to render! Key received:" + key)
            } catch (error) {
              console.log("Error uploading file: ", error);
              setStatus("There's an error: "+str(error));
            }
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>{status}</p>
              </div>
            </section>
          )}
        </Dropzone>
      </div>
    </div>
  );
}
