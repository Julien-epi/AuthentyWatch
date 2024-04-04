"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
const TableDetails: React.FC<Props> = ({ txHistoric }) => {
  return (
    <>
      <h2 className="text-gray-300 text-center font-bold">Txs historic</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] hover:text-gray-100">
              FROM
            </TableHead>
            <TableHead className="hover:text-gray-100">TO</TableHead>
            <TableHead className="text-right hover:text-gray-100">
              DATE
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {txHistoric.map((tx: any) => (
            <TableRow key={tx.from}>
              <TableCell className="font-medium text-gray-500 hover:text-gray-100">
                {tx.from.slice(0, 3) + "..." + tx.from.slice(-3)}
              </TableCell>
              <TableCell className="text-gray-500 hover:text-gray-100">
                {tx.to.slice(0, 3) + "..." + tx.to.slice(-3)}
              </TableCell>
              <TableCell className="text-right text-gray-500 hover:text-gray-100">
                {tx.date}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default TableDetails;
