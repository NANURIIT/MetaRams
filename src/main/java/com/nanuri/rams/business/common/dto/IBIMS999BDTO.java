package com.nanuri.rams.business.common.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/**
 * 영업일
 */
public class IBIMS999BDTO {
    
    private String bzDd;            /* 영업일자 */
    private String dd1AgBzDd;       /* 1일전영업일자 */
    private String dd2AgBzDd;       /* 2일전영업일자 */
    private String dd3AgBzDd;       /* 3일전영업일자 */
    private String dd1AfBzDd;       /* 1일후영업일자 */
    private String dd2AfBzDd;       /* 2일후영업일자 */
    private String dd3AfBzDd;       /* 3일후영업일자 */

}
