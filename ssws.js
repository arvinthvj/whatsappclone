import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import styles from "./gallery.module.sass";
import Empty from "../../assets/video/emptyFolder.png";
import { useNavigate } from "react-router-dom";
import Pagination from "../../common-components/pagination/Pagination";
import MediaGalleryFilter from "./MediaGalleryFilter";
import { VAR } from "../../env";
import axios from "axios";
import SortLatest from "../../services/SortLatest";
import moment from "moment";

function MediaGallery() {
  const [visible, setVisible] = useState(false);
  const [galleryFolderData, setGalleryFolderData] = useState([]);
  const [filterStartDate, setFilterStartDate] = useState(null);
  const [filterEndDate, setFilterEndDate] = useState(null);
  const [filterAlbumSelect, setFilterAlbumSelect] = useState([]);
  // const [completeFilters , setCompleteFilters] = useState({});

  const history = useNavigate();
  const handleEvents = (Id) => {
    history(`/community/gallery/${Id}`);
  };

  useEffect(() => {
    let apiUrl = `${VAR.BASE_URL}/_api/web/lists/getbytitle('Media-Gallery')/Items?$select=FileRef,Created/FileRef &$orderby=Created desc`;
    let axiosHeaders = {
      headers: {
        Accept: "application/json;odata=verbose",
        "odata-version": "",
        "Content-Type": "Application/json",
      },
    };
    axios.get(apiUrl, axiosHeaders).then((res) => {
      let sorted = SortLatest(res.data.d.results);
      const folderedData = sorted.reduce((acc, curr) => {
        acc.push({
          folderName: curr.FileRef.split("/")[4],
          folderSlug: curr.FileRef.split("/")[4]
            .split(" ")
            .join("-")
            .toLowerCase(),
          imgUrl: VAR.BASE_URL + curr.FileRef,
          imgExt: curr.FileRef.split(".")[curr.FileRef.split(".").length - 1],
          CreatedOn: curr.Created,
          folderCreatedOn: moment(curr.Created).format(
            "DD / MMMM / YYYY hh : mm A"
          ),
        });
        
        // debugger;
        const filteringReference = {
            filterStartDate : filterData,
            filterEndDate : filterData
        }
        return acc.filter((filterData, i) => {
        //   if (filterStartDate && filterEndDate)
        //     return (
        //       new Date(filterData.CreatedOn).getTime()` >
        //         new Date(filterStartDate).getTime() &&
        //       new Date(filterData.CreatedOn).getTime() <
        //         new Date(filterEndDate).getTime()
        //     );
        //   else if (filterAlbumSelect?.length > 0)
        //     return filterAlbumSelect.find((findData) => {
        //       return findData === filterData.folderName;
        //     });
        //   else 
          return acc;
        });
      }, []);

      console.log("GALL sorted", folderedData);

      const uniqueFolderedData = folderedData.reduce((acc, curr) => {
        const x = acc.find((item) => item.folderName === curr.folderName);
        if (!x) {
          return acc.concat([curr]);
        } else {
          return acc;
        }
      }, []);

      console.log("folderedData", uniqueFolderedData);
      setGalleryFolderData(uniqueFolderedData);
    });
  }, [filterStartDate, filterEndDate, filterAlbumSelect]);

  return (
    <Row className={`h-100 `} gutter={[16, 16]}>
      <Col xs={0} sm={0} md={0} lg={18} xl={18}>
        <Row gutter={[16, 16]}>
          {galleryFolderData.map((data) => (
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              <div
                className={`d-flex justify-content-center shadow align-items-center overflow-hidden w-100 cursor-pointer ${styles.galleryImgContainer}`}
                onClick={() => {
                  handleEvents(data.folderSlug);
                }}
              >
                <img
                  src={
                    data.imgExt.toLowerCase() === "png" ||
                    data.imgExt.toLowerCase() === "jpg" ||
                    data.imgExt.toLowerCase() === "jpeg" ||
                    data.imgExt.toLowerCase() === "webp" ||
                    data.imgExt.toLowerCase() === "tif" ||
                    data.imgExt.toLowerCase() === "gif" ||
                    data.imgExt.toLowerCase() === "jfif"
                      ? data.imgUrl
                      : Empty
                  }
                  alt=""
                  width={`100%`}
                />
                <div
                  className={`position-absolute h-100 ${styles.galleryImgLayer}`}
                />
                <div
                  className={`p-4 d-flex flex-column justify-content-end position-absolute h-100 ${styles.galleryImgLayerText}`}
                >
                  <div className={`${styles.galleryImgLayerAlbumName}`}>
                    Album
                  </div>
                  <div className={`py-2 ${styles.galleryImgLayerAlbumDes}`}>
                    {data.folderName}
                  </div>
                  <div className={`pb-1 ${styles.galleryImgLayerAlbumDate}`}>
                    {data.folderCreatedOn}
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
        <div className={`d-flex justify-content-center py-4`}>
          <Pagination />
        </div>
      </Col>
      <Col xs={0} sm={0} md={0} lg={6} xl={6}>
        <div className={`bg-light shadow ${styles.galleryFilterCardContainer}`}>
          <div
            className={`p-4 border-bottom border-2 ${styles.galleryFilterCardTitle}`}
          >
            Filter Gallery
          </div>
          <MediaGalleryFilter
            setFilterStartDate={setFilterStartDate}
            setFilterEndDate={setFilterEndDate}
            setFilterAlbumSelect={setFilterAlbumSelect}
          />
        </div>
      </Col>

      {/* Responsive View */}

      <Col xs={24} sm={24} md={24} lg={0} xl={0}>
        <div className={`bg-light shadow ${styles.galleryFilterCardContainer}`}>
          <div
            className={`p-4 d-flex justify-content-between align-items-center border-bottom border-2 ${styles.galleryFilterCardTitle}`}
            onClick={() => {
              setVisible(!visible);
            }}
          >
            <span>Filter Gallery</span>
            {visible ? (
              <i className="fas fa-chevron-up"></i>
            ) : (
              <i className="fas fa-chevron-down"></i>
            )}
          </div>
          {visible && (
            <MediaGalleryFilter
              setFilterStartDate={setFilterStartDate}
              setFilterEndDate={setFilterEndDate}
              setFilterAlbumSelect={setFilterAlbumSelect}
            />
          )}
        </div>
      </Col>

      <Col xs={24} sm={24} md={24} lg={0} xl={0}>
        <Row gutter={[16, 16]}>
          {galleryFolderData.map((data) => (
            <Col xs={24} sm={24} md={12} lg={0} xl={0}>
              <div
                className={`d-flex justify-content-center shadow align-items-center overflow-hidden w-100 cursor-pointer ${styles.galleryImgContainer}`}
                onClick={() => {
                  handleEvents(data.folderSlug);
                }}
              >
                <img
                  src={
                    data.imgExt.toLowerCase() === "png" ||
                    data.imgExt.toLowerCase() === "jpg" ||
                    data.imgExt.toLowerCase() === "jpeg" ||
                    data.imgExt.toLowerCase() === "webp" ||
                    data.imgExt.toLowerCase() === "tif" ||
                    data.imgExt.toLowerCase() === "gif" ||
                    data.imgExt.toLowerCase() === "jfif"
                      ? data.imgUrl
                      : Empty
                  }
                  alt=""
                  width={`100%`}
                />
                <div
                  className={`position-absolute h-100 ${styles.galleryImgLayer}`}
                />
                <div
                  className={`p-4 d-flex flex-column justify-content-end position-absolute h-100 ${styles.galleryImgLayerText}`}
                >
                  <div className={`${styles.galleryImgLayerAlbumName}`}>
                    Album
                  </div>
                  <div className={`py-2 ${styles.galleryImgLayerAlbumDes}`}>
                    {data.folderName}
                  </div>
                  <div className={`pb-1 ${styles.galleryImgLayerAlbumDate}`}>
                    {data.folderCreatedOn}
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
        <div className={`d-flex justify-content-center py-4`}>
          <Pagination />
        </div>
      </Col>
    </Row>
  );
}

export default MediaGallery;