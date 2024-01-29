// Contains the function to load the AWS S3 configuration (see AWS-S3.md), and upload to AWS S3.

import AWS from "aws-sdk";
import { parse } from "path";

// Function that handles uploading to AWS S3 with a file passed on. 
export async function uploadToS3(file: File) {
  try {
    AWS.config.update({
      accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
    });
    const s3 = new AWS.S3({
      // Params configures our S3 buckets.
      params: {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
      },
      // Region set in S3 bucket properties.
      region: "ap-southeast-2",
    });

    // File key is the name of the file, with the current date and time prepended to it.
    const file_key = 'uploads/' + Date.now().toString() + file.name.replace(' ', '-')

    const params = {
      // Bucket is the name of the bucket we are uploading to. It has a "!" at the end because it is a required field. Else it will throw an error as it is not defined.
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
      // Key is uniquely identifiable to the file. 
      Key: file_key,
      // Body is set to the file passed into the uploadToS3 function.
      Body: file
    }

    // Upload to S3 bucket
    // upload is a promise that returns an object.
    // the callback function on httpUploadProgress is used to track the progress of the upload which allows us to display UI such as a progress bar.
    const upload = s3.putObject(params).on('httpUploadProgress', evt => {
      console.log("uploading to S3...", parseInt(((evt.loaded*100)/evt.total).toString()) + "%");
    }).promise();

    // This is the callback function that is called when the upload is complete.
    await upload.then(data => {
      console.log("successfully uploaded to S3", file_key);
    });


    // As this is an async function, we need to return a promise to ensure that the function is completed before the next function is called.
    return Promise.resolve({
      // Return the file key and file name to be used in the database.
      file_key,
      file_name: file.name, 
    });

  } catch (error) {}
}

// A utility function that handles getting the publicly accessible S3 URL of a file so that we can embed the file in the frontend later on.
export function getS3Url(file_key: string) {
  const url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.ap-southeast-2.amazonaws.com/${file_key}`;
  return url;
}