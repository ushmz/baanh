import { MDBContainer, MDBBtn } from "mdbreact";
import React from "react";
import { getHistoriesAsync } from '../background/chromeHistory';
import { exportHistories } from '../background/exportHistory';

export const Popup = () => {
  return (
    <MDBContainer className="m-3">
      <p>実験へのご協力ありがとうございます。以下のボタンから履歴情報を書き出してください。</p>
      <MDBBtn
        style={{ width: '240px' }}
        color="primary"
        onClick={async () => {
          const histories = await getHistoriesAsync(2000);
          await exportHistories(histories);
        }}
      >
        書き出す
      </MDBBtn>
      {/* <p>実験へのご協力ありがとうございます。以下のボタンから設定してください。</p>
      <MDBBtn
        style={{ width: '240px' }}
        color="primary"
        onClick={() => {
          chrome.tabs.create({ url: `chrome-extension://${chrome.runtime.id}/option.html` });
        }}
      >
        詳細設定
      </MDBBtn> */}
    </MDBContainer>
  );
};

