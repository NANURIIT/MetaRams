package com.nanuri.rams.business.assessment.tb10.tb10210;

import com.nanuri.rams.business.common.dto.IBIMS006BDTO;
import com.nanuri.rams.business.common.dto.IBIMS007BDTO;
import com.nanuri.rams.business.common.vo.IBIMS005BVO;
import com.nanuri.rams.business.common.vo.IBIMS006BVO;
import com.nanuri.rams.business.common.vo.IBIMS007BVO.menuUpdateRequestVO;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.List;



@Service
public interface TB10210Service {

	public List<IBIMS006BVO> getAuthCode(String rghtCdNm) throws ParseException;
	
	public List<IBIMS005BVO> getAuthCodeMenu(String rgCdNm);
	
	public boolean registerAuthCode(List<IBIMS006BVO> requestDtos);
	
	public boolean deleteAuthCode(List<String> rghtCd);
	
	public boolean registerAuthCodeMenu(List<menuUpdateRequestVO> voList);

	public int mergeAthCd(List<IBIMS006BDTO> param);

	public int updateMdfyRghtCcd(List<IBIMS007BDTO> param);

}
