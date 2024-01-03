import { db } from "../firebase/config";
import { auth } from "@clerk/nextjs";
import { format } from "date-fns";
import { FileType } from "@/typings/type";
import { collection, getDocs, } from "firebase/firestore";
import Dropzone from "./Dropzone";
import TableWrapper from "./Table-Wrapper";

const Dashboard = async () => {
  const { userId } = auth();

  const docData = await getDocs(collection(db, "users", userId!, "files"));

  const skeletonFiles: FileType[] = docData.docs.map((doc) => ({
    id: doc.id,
    fileName: doc.data().fileName || doc.id,
    fileSize: doc.data().fileSize,
    fileType: doc.data().fileType,
    fullName: doc.data().fullName,
    timeStamp: doc.data().timestamp
      ? format(doc.data().timestamp?.toDate(), "dd-MM-yyyy hh:mm a")
      : "",
    downloadURL: doc.data().downloadURL,
  }));

  return (
    <div>
      <Dropzone />

      <TableWrapper skeletonFiles={skeletonFiles} />
    </div>
  );
};

export default Dashboard;
