"use client";
import React, { FC, useEffect, useMemo, useState } from "react";
import {
  ActionButton,
  SuccessHackModal,
  Timer,
  VideoLoader,
} from "@/components";
import Image from "next/image";

import styles from "./Homepage.module.scss";
import classNames from "classnames";

export const Homepage: FC = () => {
  const createMatrix = useMemo(() => {
    const rows = 5;
    const columns = 5;
    let matrix: string[][] = [];
    for (let i = 0; i < rows; i++) {
      matrix[i] = [];
      for (let j = 0; j < columns; j++) {
        let randomNumber;
        do {
          randomNumber = Math.floor(Math.random() * 256);
        } while (randomNumber === 0);
        matrix[i][j] = ("0" + randomNumber.toString(16)).slice(-2);
      }
    }
    return matrix;
  }, []);

  const [buffer, setBuffer] = useState<string[]>(Array(7).fill(""));

  const addBufferValue = (value: string) => {
    const newBuffer = [...buffer];
    const index = newBuffer.indexOf("");
    if (index !== -1) {
      newBuffer[index] = value;
      setBuffer(newBuffer);
    }
  };

  const [blockedRows, setBlockedRows] = useState<number[]>([1, 2, 3, 4]);
  const [blockedColumns, setBlockedColumns] = useState<number[]>([
    0, 1, 2, 3, 4,
  ]);
  const blockRowAndUnblockColumn = (rowIndex: number, colIndex: number) => {
    const newBlockedColumns = [];
    const newBlockedRows = [];

    for (let i = 0; i < createMatrix.length; i++) {
      if (i !== rowIndex) {
        newBlockedRows.push(i);
      }
    }

    for (let j = 0; j < createMatrix[rowIndex].length; j++) {
      if (j !== colIndex) {
        newBlockedColumns.push(j);
      }
    }

    setBlockedColumns(newBlockedColumns);
    setBlockedRows(newBlockedRows);
  };
  const isRowBlocked = (rowIndex: number) => {
    return blockedRows.includes(rowIndex);
  };

  const isColumnBlocked = (colIndex: number) => {
    return blockedColumns.includes(colIndex);
  };

  const getSequence = useMemo(() => {
    return (matrix: string[][], length: number) => {
      const sequence: string[] = [];
      const visitedIndices: Set<string> = new Set();

      let colIndex = Math.floor(Math.random() * matrix[0].length);

      sequence.push(matrix[0][colIndex]);
      visitedIndices.add(`0-${colIndex}`);

      while (sequence.length < length) {
        let rowIndex = Math.floor(Math.random() * matrix.length);
        colIndex = Math.floor(Math.random() * matrix[rowIndex].length);
        const indexKey = `${rowIndex}-${colIndex}`;

        if (!visitedIndices.has(indexKey)) {
          sequence.push(matrix[rowIndex][colIndex]);
          visitedIndices.add(indexKey);
        }
      }

      return sequence;
    };
  }, []);
  const sequence2 = useMemo(() => getSequence(createMatrix, 2), [createMatrix]);
  const sequence3 = useMemo(() => getSequence(createMatrix, 3), [createMatrix]);
  const sequence4 = useMemo(() => getSequence(createMatrix, 5), [createMatrix]);
  const sequence5 = useMemo(() => getSequence(createMatrix, 6), [createMatrix]);

  const [seconds, setSeconds] = useState(8);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  const [endDate] = useState(Date.now() + 9000000);

  const [matchedSequences, setMatchedSequences] = useState<
    { message: string; sequence: string[] }[]
  >([]);

  useEffect(() => {
    const newMatchedSequences = [];
    if (sequence2.every((value) => buffer.includes(value))) {
      newMatchedSequences.push({
        message: "Success Authorization",
        type: true,
        sequence: sequence2,
      });
    }
    if (sequence3.every((value) => buffer.includes(value))) {
      newMatchedSequences.push({
        message: "Full Netw0rk Access",
        type: true,
        sequence: sequence3,
      });
    }

    if (sequence4.every((value) => buffer.includes(value))) {
      newMatchedSequences.push({
        message: "Daemon Success Launched",
        type: true,
        sequence: sequence4,
      });
    }

    if (sequence5.every((value) => buffer.includes(value))) {
      newMatchedSequences.push({
        message: "R00t Access Granted",
        type: true,
        sequence: sequence5,
      });
    }

    setMatchedSequences(newMatchedSequences);
  }, [buffer, sequence2, sequence3, sequence4, sequence5]);

  return (
    <React.Fragment>
      <div className={styles.hackContainer}>
        <div className={styles.lestSideHackContainer}>
          <div className={styles.leftSideHackTimer}>
            <p className={styles.leftSideHackText}>Breach time remaining</p>
            <Timer endDate={endDate} />
          </div>
          <div className={styles.leftSideHackMatrix}>
            <div className={styles.leftSideHackMatrixHeader}>
              <Image
                alt=""
                className={styles.headerMatrixImage}
                src={"./svg/matrixLogo.svg"}
                width={20}
                height={20}
              />
              <p className={styles.headerMatrixText}>Code matrix</p>
            </div>
            <div className={styles.leftSideHackMatrixMain}>
              {createMatrix.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={classNames(
                    styles.matrixRow,
                    !isRowBlocked(rowIndex) ? styles.unblockedRow : ""
                  )}
                >
                  {row.map((cell, colIndex) => (
                    <td
                      key={colIndex}
                      className={classNames(
                        styles.matrixCell,
                        !isColumnBlocked(colIndex) ? styles.unblockedColumn : ""
                      )}
                    >
                      <ActionButton
                        onClick={() => {
                          addBufferValue(cell);
                          blockRowAndUnblockColumn(rowIndex, colIndex);
                        }}
                        text={cell}
                        disabled={
                          isRowBlocked(rowIndex) && isColumnBlocked(colIndex)
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.rightSideHackContainer}>
          <div className={styles.rightSideHackBuffer}>
            <div className={styles.currentBuffer}>
              {buffer.map((value, index) => (
                <span className={styles.currentBufferValue} key={index}>
                  {value !== "" ? value : "-"}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.rightSideHackSequence}>
            <div className={styles.sequenceHeader}>
              <Image
                src={"./svg/sequence.svg"}
                width={20}
                height={20}
                alt=""
                className={styles.sequenceHeaderImage}
              />
              <p className={styles.sequenceHeaderText}>
                sequence required to upload
              </p>
            </div>
          </div>

          <div className={styles.sequenceMatrix}>
            {sequence2.map((value, index) => (
              <p
                key={index}
                className={classNames(
                  styles.sequenceValue,
                  buffer.includes(value) && styles.greenText
                )}
              >
                {value}
              </p>
            ))}
            <div className={styles.sequenceInfo}>
              <Image
                className={styles.sequenceImage}
                width={20}
                height={20}
                alt=""
                src={"./svg/doorHack.svg"}
              />
              <p className={styles.sequenceText}>user authorization</p>
            </div>
          </div>
          <div className={styles.sequenceMatrix}>
            {sequence3.map((value, index) => (
              <p
                key={index}
                className={classNames(
                  styles.sequenceValue,
                  buffer.includes(value) && styles.greenText
                )}
              >
                {value}
              </p>
            ))}
            <div className={styles.sequenceInfo}>
              <Image
                className={styles.sequenceImage}
                width={20}
                height={20}
                alt=""
                src={"./svg/netHack.svg"}
              />
              <p className={styles.sequenceText}>network access</p>
            </div>
          </div>
          <div className={styles.sequenceMatrix}>
            {sequence4.map((value, index) => (
              <p
                key={index}
                className={classNames(
                  styles.sequenceValue,
                  buffer.includes(value) && styles.greenText
                )}
              >
                {value}
              </p>
            ))}
            <div className={styles.sequenceInfo}>
              <Image
                className={styles.sequenceImage}
                width={20}
                height={20}
                alt=""
                src={"./svg/loadDemon.svg"}
              />
              <p className={styles.sequenceText}>launch the daemon</p>
            </div>
          </div>
          <div className={styles.sequenceMatrix}>
            {sequence5.map((value, index) => (
              <p
                key={index}
                className={classNames(
                  styles.sequenceValue,
                  buffer.includes(value) && styles.greenText
                )}
              >
                {value}
              </p>
            ))}
            <div className={styles.sequenceInfo}>
              <Image
                className={styles.sequenceImage}
                width={20}
                height={20}
                alt=""
                src={"./svg/rootAcess.svg"}
              />
              <p className={styles.sequenceText}>R00T ACCESS</p>
            </div>
          </div>
        </div>
      </div>
      <VideoLoader open={seconds === 0 ? false : true} />
      {matchedSequences.length > 0 && (
        <SuccessHackModal matchedSequences={matchedSequences} />
      )}
    </React.Fragment>
  );
};
