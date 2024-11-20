package com.nanuri.rams.business.common.vo;

import java.util.ArrayList;
import java.util.List;

import com.nanuri.rams.business.common.dto.RAA20BDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 * 협의체파일첨부정보 Table.RAA20B VO
 * */
public class RAA20BVO extends RAA20BDTO {
	
	private List<Integer> arrAttFileSq = new ArrayList<>();		/* 첨부파일일련번호목록 */

  public void setArratchFleSn(Object object) {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'setArratchFleSn'");
  }

}
