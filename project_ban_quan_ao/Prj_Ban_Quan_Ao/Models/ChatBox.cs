using System;
using System.Collections.Generic;

namespace Prj_Ban_Quan_Ao.Models;

public partial class ChatBox
{
    public Guid Id { get; set; }

    public Guid? AdminId { get; set; }

    public Guid? AccountId { get; set; }

    public string? NoiDung { get; set; }

    public DateTime? NgayTao { get; set; }

    public Guid? NguoiGuiId { get; set; }
}
