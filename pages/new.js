import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { useCallback, useState, useMemo } from "react";
import Dropzone from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import { Storage } from "@aws-amplify/storage";

export default function Home() {
  const [status, setStatus] = useState(
    "Drag 'n' drop some files here, or click to select files."
  );

//   async function onChange(e) {
//     const file = e.target.files[0];
//     console.log("e", e);
//     console.log("file", file);
//     setStatus("Hold on!");
//     try {
//         const { key } = await Storage.put(uuidv4(), file, {
//           level: "private",
//           progressCallback(progress) {
//             console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
//             setStatus(`Uploaded: ${progress.loaded}/${progress.total}`);
//           },
//         });

//         console.log("S3 Object key", key);
//         setStatus(
//           "Done. Your file has been sent to render! Key received:" + key
//         );
//       } catch (error) {
//         console.log("Error uploading file: ", error);
//         setStatus("There's an error: " + error);
//       }
//   }

  return (
    <div className="font-inter">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="border-dashed	border-green-500 rounded-lg border-4 p-24 h-screen flex items-center place-content-center flex-col">
        <Dropzone
          onDrop={async (acceptedFiles) => {
            setStatus("Hold on!");
            console.log(acceptedFiles[0]);
            try {
              const { key } = await Storage.put(uuidv4(), acceptedFiles[0], {
                level: "private",
                progressCallback(progress) {
                  console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
                  setStatus(`Uploaded: ${progress.loaded}/${progress.total}`);
                },
              });

              console.log("S3 Object key", key);
              setStatus(
                "Done. Your file has been sent to render! Key received:" + key
              );
            } catch (error) {
              console.log("Error uploading file: ", error);
              setStatus("There's an error: " + error);
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

        {/* <input type="file" onChange={onChange} />
        {status} */}
      </div>
    </div>
  );
}
