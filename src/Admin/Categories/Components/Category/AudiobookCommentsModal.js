{/* <div className="row d-flex justify-content-center text-light text-center">
<h4>{props.t("comments")}</h4>
</div>
{getCommentList()} */}


    //Todo tu mam do zrobienia te drzewo komentarzy

// const getCommentList = () => {
//     let comments = [];
//     if (audiobookComments != null) {
//       if (audiobookComments.audiobookCommentGetModels != undefined) {
//         audiobookComments.audiobookCommentGetModels.forEach((comment) => {
//           comments.push(createComment(comment));
//         });
//       }
//     }

//     return (
//       <div className="row text-light d-flex justify-content-center mx-1">
//         {comments}
//       </div>
//     );
//   };
//   const createComment = (comment) => {

//     return (
//       <div
//         key={uuidv4()}
//         className="row border border-secondary category_data mb-1"
//       >
//         <div className="row">
//           <div className="col">{props.t("owner")}:</div>
//           <div className="col">{comment.userModel.email}</div>
//         </div>
//         <div className="row">
//           <div className="col">{props.t("comment")}:</div>
//           <div className="col">{comment.comment}</div>
//         </div>
//       </div>
//     );
//   };