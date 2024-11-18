package com.nanuri.rams.business.assessment.tb07.tb07040;

import com.nanuri.rams.business.common.dto.IBIMS402BDTO;
import com.nanuri.rams.business.common.dto.IBIMS405BDTO;
import com.nanuri.rams.business.common.dto.IBIMS410BDTO;
import com.nanuri.rams.business.common.vo.IBIMS405BVO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TB07040Service {

	public List<IBIMS405BVO> getSellList(IBIMS405BDTO paramData);

	public int saveSellInfo(IBIMS405BDTO paramData);

	public int saveDvdnInfo(IBIMS405BDTO paramData);

	public int cancelSellInfo(IBIMS405BDTO paramData);

	// public int cancelDvdnList(IBIMS405BDTO paramData);

	public int getTrSn(IBIMS405BDTO paramData);

	public int saveDlTrList(IBIMS410BDTO paramData);

	public int updateDlTrList(IBIMS410BDTO paramData);

	public int cancelDlTrList(IBIMS410BDTO paramData);

	public String chkExcInfo(String paramData);

	public int saveExcInfo(IBIMS402BDTO paramData);

	public int uptExcInfoTr(IBIMS402BDTO paramData);

	public int saveExcInfoNoKey(IBIMS402BDTO paramData);

	public int insertIBIMS402HTr(IBIMS402BDTO paramData);
}
