package com.nanuri.rams.business.assessment.as05.as05110;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.vo.RAA21BVO.CASEVO;

@Service
public interface AS05110Service {

	// Deal목록조회
	List<CASEVO> getDealDetails(CASEVO paramData);
	
	// 담당자/심사역 일괄변경
	void savePEno(List<Map<String, Object>> param);

}
