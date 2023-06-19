import { useEffect, useState } from "react";
import { NavBar } from "../NavBar/NavBar";

export interface INFTPageProps {}

export function NFTPage(props: INFTPageProps) {
  return (
    <div>
      <NavBar />
      <div className="nft_page">
        <div className="nft_page_left"></div>
        <div className="nft_page_right">
          <table>
            <tr>
              <td>Name</td>
              <td></td>
            </tr>
            <tr>
              <td>Description</td>
              <td></td>
            </tr>
            <tr>
              <td>Price</td>
              <td></td>
            </tr>
            <tr>
              <td>Owner</td>
              <td></td>
            </tr>
            <tr>
              <td>Seller</td>
              <td></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}
